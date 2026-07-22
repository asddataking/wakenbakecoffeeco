import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email").max(254),
  phone: z.string().max(40).optional().or(z.literal("")),
  emailConsent: z.boolean().refine((value) => value === true, {
    message: "Email consent is required to join the list",
  }),
  smsConsent: z.boolean().default(false),
  website: z.string().max(0).optional().or(z.literal("")),
  productInterest: z.string().max(200).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email").max(254),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10, "Please include a short message").max(5000),
  emailConsent: z.boolean(),
  smsConsent: z.boolean().default(false),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const wholesaleSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(254),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().min(1, "Business name is required").max(200),
  message: z.string().min(10).max(5000),
  productInterest: z.string().max(200).optional(),
  emailConsent: z.boolean(),
  smsConsent: z.boolean().default(false),
  website: z.string().max(0).optional().or(z.literal("")),
});

export const firstOrderSchema = newsletterSchema;

export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type WholesaleInput = z.infer<typeof wholesaleSchema>;
