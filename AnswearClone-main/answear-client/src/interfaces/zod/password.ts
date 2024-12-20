import { z } from "zod";

export const NewPasswordSchema = z
    .object({
        password: z.string().min(6, "Пароль повинен містити мінімум 8 символів"),
        passwordRepeat: z.string().min(6, "Пароль повинен містити мінімум 8 символів"),
        token: z.string().nonempty("Токен обов'язковий"),
        email: z.string().email("Невірний формат електронної пошти"),
    })
    .refine((data) => data.password === data.passwordRepeat, {
        message: "Паролі не співпадають",
        path: ["passwordRepeat"],
    });

export type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

export const ForgotPasswordSchema = z.object({
    email: z.string().email({ message: "Неправильний формат електронної пошти" }),
});

export type ForgotPasswordSchemaType = z.infer<typeof ForgotPasswordSchema>;

export const NewEmailSchema = z.object({
    newEmail: z.string().email({ message: "Неправильний формат електронної пошти" }),
    firstName: z.string(),
    lastName: z.string(),
    userId: z.number(),
});

export type NewEmailSchemaType = z.infer<typeof NewEmailSchema>;
