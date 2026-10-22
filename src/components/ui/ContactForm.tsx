"use client";

import { CircleAlert, CircleCheck, ExternalLink, LoaderCircle, Mail, RotateCcw, Send } from "lucide-react";
import { useState } from "react";
import { CONTACT_LIMITS, type ContactField } from "@/lib/contact";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { buttonPrimary, buttonSecondary } from "./styles";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";

const fieldClass =
  "mt-2 block w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-foreground transition placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15 focus-visible:outline-none aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-500/15";

export function ContactForm() {
  const [values, setValues] = useState<Record<ContactField, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const handleChange = (field: ContactField, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const errs: Partial<Record<ContactField, string>> = {};
    const trimmedName = values.name.trim();
    const trimmedEmail = values.email.trim();
    const trimmedMessage = values.message.trim();

    if (!trimmedName) {
      errs.name = "Please enter your name.";
    } else if (trimmedName.length > CONTACT_LIMITS.name) {
      errs.name = `Please keep your name under ${CONTACT_LIMITS.name} characters.`;
    }

    if (!trimmedEmail || !EMAIL_PATTERN.test(trimmedEmail) || trimmedEmail.length > CONTACT_LIMITS.email) {
      errs.email = "Please enter a valid email address.";
    }

    if (trimmedMessage.length < CONTACT_LIMITS.messageMin) {
      errs.message = `Please write at least ${CONTACT_LIMITS.messageMin} characters.`;
    } else if (trimmedMessage.length > CONTACT_LIMITS.messageMax) {
      errs.message = `Please keep your message under ${CONTACT_LIMITS.messageMax} characters.`;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    // Honeypot check: if filled, quietly simulate success
    if (honeypot) {
      setStatus("success");
      setFeedbackMessage("Thank you for reaching out! I'll get back to you soon.");
      return;
    }

    if (!WEB3FORMS_KEY) {
      setStatus("error");
      setFeedbackMessage(
        `Contact form access key is not set. Please email me directly at ${siteConfig.email}.`
      );
      return;
    }

    setStatus("submitting");
    setFeedbackMessage("");

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `💼 New Portfolio Message from ${values.name.trim()}`,
        from_name: `${values.name.trim()} (via Portfolio)`,
        replyto: values.email.trim(),
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        // Extra metadata that Web3Forms formats cleanly into the email template
        "Sender Email": values.email.trim(),
        "Submitted At": new Date().toLocaleString("en-US", {
          timeZone: "Asia/Colombo",
          dateStyle: "full",
          timeStyle: "medium",
        }),
        "Source": "Achira Sandaruwan Portfolio",
      };

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setStatus("success");
        setFeedbackMessage(
          `Thanks for reaching out, ${values.name.trim()}! Your message has been sent to Achira's primary email. I'll get back to you soon.`
        );
        // Clear inputs after successful submission
        setValues({ name: "", email: "", message: "" });
      } else {
        const errorMsg =
          data?.message ||
          `Could not send your message. Please try again or email me directly at ${siteConfig.email}.`;
        setStatus("error");
        setFeedbackMessage(errorMsg);
      }
    } catch (err) {
      console.error("[contact] Client submission error:", err);
      setStatus("error");
      setFeedbackMessage(
        `A network connection error occurred. You can click below to email Achira directly.`
      );
    }
  };

  const isPending = status === "submitting";

  // Build mailto fallback link in case of network issue
  const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    values.name ? `Portfolio Message from ${values.name}` : "Portfolio Inquiry"
  )}&body=${encodeURIComponent(
    `${values.message}\n\n---\nSent by: ${values.name} (${values.email})`
  )}`;

  if (status === "success") {
    return (
      <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center backdrop-blur-sm sm:p-8">
        <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
          <CircleCheck className="size-6" />
        </div>
        <h4 className="mt-4 text-lg font-semibold text-foreground">Message Delivered!</h4>
        <p className="mt-2 text-sm leading-relaxed text-muted">{feedbackMessage}</p>
        <p className="mt-1 text-xs text-muted/80">A notification has been routed to {siteConfig.email}.</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFeedbackMessage("");
          }}
          className={cn(buttonSecondary, "mt-6 inline-flex text-xs")}
        >
          <RotateCcw className="size-3.5" />
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={CONTACT_LIMITS.name}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="Jane Perera"
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="jane@example.com"
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            className={fieldClass}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          minLength={CONTACT_LIMITS.messageMin}
          maxLength={CONTACT_LIMITS.messageMax}
          value={values.message}
          onChange={(e) => handleChange("message", e.target.value)}
          placeholder="Hi Achira, I'd love to chat about a project or collaboration..."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(fieldClass, "resize-y")}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot field for spam bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* Feedback banner if error occurs */}
      {status === "error" && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-600 dark:text-red-400">
          <div className="flex items-start gap-2">
            <CircleAlert className="mt-0.5 size-4 shrink-0" />
            <div className="space-y-2">
              <p>{feedbackMessage}</p>
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-1.5 font-semibold underline underline-offset-4 hover:opacity-85"
              >
                <Mail className="size-3.5" />
                Send via default email app / Gmail
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          aria-busy={isPending}
          className={cn(buttonPrimary, "w-full disabled:cursor-wait disabled:opacity-75 sm:w-auto")}
        >
          {isPending ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Send Message
              <Send aria-hidden="true" className="size-4" />
            </>
          )}
        </button>

        <p className="text-xs text-muted">
          Delivers directly to <span className="font-medium text-foreground">{siteConfig.email}</span>
        </p>
      </div>
    </form>
  );
}
