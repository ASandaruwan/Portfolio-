export type ContactField = "name" | "email" | "message";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  errors?: Partial<Record<ContactField, string>>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Record<ContactField, string>;
}

export const initialContactState: ContactFormState = { status: "idle", message: "" };

export const CONTACT_LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 5000,
} as const;
