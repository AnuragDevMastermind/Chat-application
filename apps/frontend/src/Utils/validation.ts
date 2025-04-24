import { z } from "zod";

export const signUpValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum legngth of password should be 3" })
    .max(50, { message: "Maximum legngth of password should be 50" }),
  number: z
    .string()
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});

export const loginValidationSchema = z.object({
  number: z
    .string()
    .min(10, { message: "Minimum number is 10" })
    .regex(/^\d+$/, { message: "Invalid number" }),
  password: z
    .string()
    .min(6, { message: "Minimum legngth of password should be 6" })
    .regex(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]+$/,
      "Password must have at least 6 characters, including a number, a special character, and a capital letter"
    ),
});

export const actorValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 2 characters long" }),
  gender: z
    .string()
    .min(4, { message: "Gender must be either Male or Female" }),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters long" })
    .max(500, { message: "Bio must not exceed 500 characters" }),
});

export const producerValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 2 characters long" }),
  gender: z
    .string()
    .min(4, { message: "Gender must be either Male or Female" }),
  bio: z
    .string()
    .min(3, { message: "Bio must be at least 3 characters long" })
    .max(500, { message: "Bio must not exceed 500 characters" }),
});

export const movieValidationSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  poster: z.string().min(1, { message: "Image URL must not be empty" }),
  releaseYear: z
    .string()
    .min(4, { message: "Release year must be after 1000" }),
  plot: z
    .string()
    .min(10, { message: "Plot must be at least 10 characters long" }),
  producer: z
    .string()
    .min(3, { message: "Producer name must be at least 3 characters long" }),
});
