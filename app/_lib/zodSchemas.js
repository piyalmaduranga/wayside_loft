import { z } from "zod";
import { countryCodes, isValidPhoneNumber } from "./countryCodes";

export const subscriberSchema = z.object({
  email: z.string().email("invalid email format."),
});

export const profileSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, { message: "Fullname must contains at least 3 characters" })
    .max(64, { message: "Fullname cannot exceed 64 characters" }),
  nationality: z.string(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,4}$/, {
      message: "Invalid phone number format."
    }),
  email: z.string().email("invalid email format."),
}).refine((data) => {
  const nationalityName = data.nationality.split("%")[0];
  const matchedCountry = countryCodes.find(
    (c) => c.name.toLowerCase() === nationalityName.toLowerCase()
  );
  if (!matchedCountry) return true;

  let localPart = data.phone;
  if (data.phone.startsWith(matchedCountry.dial)) {
    localPart = data.phone.substring(matchedCountry.dial.length);
  }
  
  return isValidPhoneNumber(matchedCountry.code, localPart);
}, {
  message: "Phone number is invalid for the selected country.",
  path: ["phone"]
});

export const signInSchema = z.object({
  email: z.string().email("invalid email format."),
  password: z.string().min(1, "the password is required.").max(64),
});

export const bookingSchema = z.object({
  guests_count: z.number({ message: "guests number is invalid" }).gt(0),
  start_date: z
    .string({ message: "date is invalid" })
    .date({ message: "date is invalid" }),
  end_date: z
    .string({ message: "date is invalid" })
    .date({ message: "date is invalid" }),
});

export const reservationSchema = z.object({
  fullname: z
    .string()
    .trim()
    .min(3, { message: "Fullname must contains at least 3 characters" })
    .max(64, { message: "Fullname cannot exceed 64 characters" }),
  nationality: z.string({ message: "Nationality is required" }),
  phone: z
    .string()
    .regex(/^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,4}$/, {
      message: "Invalid phone number format."
    }),
  email: z.string().email("invalid email format."),
  nationalID: z
    .string()
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .max(255, { message: "Message cannot exceed 255 characters" })
    .optional(),
}).refine((data) => {
  const nationalityName = data.nationality.split("%")[0];
  const matchedCountry = countryCodes.find(
    (c) => c.name.toLowerCase() === nationalityName.toLowerCase()
  );
  if (!matchedCountry) return true;

  let localPart = data.phone;
  if (data.phone.startsWith(matchedCountry.dial)) {
    localPart = data.phone.substring(matchedCountry.dial.length);
  }
  
  return isValidPhoneNumber(matchedCountry.code, localPart);
}, {
  message: "Phone number is invalid for the selected country.",
  path: ["phone"]
});

export const signupSchema = z
  .object({
    fullname: z
      .string({ required_error: "Required" })
      .min(3, { message: "Name must be at least 3 characters" })
      .max(64, "Name cannot exceed 64 charcters"),
    email: z.string().email(),
    password: z.string(6).min(6, { message: "Password is required" }),
    confirm_password: z
      .string()
      .min(6, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password doesn't match confirmation",
    path: ["confirm_password"],
  });

export const contactSchema = z.object({
  fullname: z
    .string({ required_error: "Fullname is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(64, "Name cannot exceed 64 charcters"),
  email: z.string().email(),
  phone: z.string(),
  message: z
    .string()
    .min(20, { message: "Message must contain at least 20 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" }),
}).refine((data) => {
  const matchedCountry = countryCodes.find((c) => data.phone.startsWith(c.dial));
  if (!matchedCountry) {
    return /^\+?[0-9]{1,4}?[-.\s]?(\(?\d{1,3}?\)?[-.\s]?){1,4}\d{1,4}$/.test(data.phone);
  }
  
  const localPart = data.phone.substring(matchedCountry.dial.length);
  return isValidPhoneNumber(matchedCountry.code, localPart);
}, {
  message: "Phone number is invalid for the selected country code.",
  path: ["phone"]
});
