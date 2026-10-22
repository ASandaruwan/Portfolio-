"use server";

import { siteConfig } from "@/data/site";
import { CONTACT_LIMITS, type ContactField, type ContactFormState } from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readField(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function validate(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, string>> = {};

  if (!values.name) errors.name = "Please enter your name.";
  else if (values.name.length > CONTACT_LIMITS.name)
    errors.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;

  if (!EMAIL_PATTERN.test(values.email) || values.email.length > CONTACT_LIMITS.email)
    errors.email = "Please enter a valid email address.";

  if (values.message.length < CONTACT_LIMITS.messageMin)
    errors.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
  else if (values.message.length > CONTACT_LIMITS.messageMax)
    errors.message = `Please keep your message under ${CONTACT_LIMITS.messageMax} characters.`;

  return errors;
}

/**
 * Delivers contact form submissions via Web3Forms API.
 * Requires WEB3FORMS_ACCESS_KEY in .env.local.
 * Get your free access key at https://web3forms.com
 *
 * Messages are sent to the email address associated with the access key
 * (your primary email: achirasandaruwan123@gmail.com).
 */
export async function sendContactMessage(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const success: ContactFormState = {
    status: "success",
    message: "Thanks for reaching out! Your message is on its way — I'll get back to you soon.",
  };

  // Honeypot: hidden from people, so only bots fill it in. Pretend it worked.
  if (readField(formData, "company")) return success;

  const values: Record<ContactField, string> = {
    name: readField(formData, "name"),
    email: readField(formData, "email"),
    message: readField(formData, "message"),
  };

  const errors = validate(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors, values };
  }

  const failure: ContactFormState = {
    status: "error",
    message: `Sorry, your message couldn't be sent. Please try again, or email me at ${siteConfig.email}.`,
    values,
  };

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    if (process.env.NODE_ENV === "development") {
      console.info("[contact] WEB3FORMS_ACCESS_KEY is not set; logging the message instead of sending it:", values);
      return { ...success, message: "Message received (dev mode: logged to the server console, not emailed)." };
    }
    console.error("[contact] WEB3FORMS_ACCESS_KEY is not set; the message was not delivered.");
    return failure;
  }

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New portfolio message from ${values.name}`,
        from_name: values.name,
        replyto: values.email,
        name: values.name,
        email: values.email,
        message: values.message,
        botcheck: false,
      }),
    });

    let result: { success?: boolean; message?: string } | null = null;
    try {
      result = await response.json();
    } catch {
      const text = await response.text().catch(() => "");
      console.error("[contact] Non-JSON response from Web3Forms:", response.status, text.slice(0, 200));
      return failure;
    }

    if (!response.ok || !result?.success) {
      console.error("[contact] Web3Forms rejected the message:", response.status, result);
      return failure;
    }

    console.info("[contact] Message sent successfully via Web3Forms:", result);
  } catch (error) {
    console.error("[contact] Could not reach Web3Forms:", error);
    return failure;
  }

  return success;
}
