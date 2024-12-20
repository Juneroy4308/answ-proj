import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z.string().email({ message: "Неправильний формат електронної пошти" }),
    password: z.string().min(6, { message: "Пароль має містити не менше 6 символів" }),
});

export type UserLoginSchemaType = z.infer<typeof UserLoginSchema>;

export const UserRegisterSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .email({ message: "Неправильний формат електронної пошти" }),
    password: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .min(6, { message: "Пароль має містити не менше 6 символів" }),
    terms: z.boolean({ required_error: "Будь ласка, ознайомтеся і погодьтеся з Правилами" }).refine((value) => value, {
        message: "Будь ласка, ознайомтеся і погодьтеся з Правилами",
    }),
    newsletter: z.boolean().optional(),
});

export type UserRegisterSchemaType = z.infer<typeof UserRegisterSchema>;

export const NewsletterSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .email({ message: "Будь ласка, введіть електронну адресу правильно" }),
});

export type NewsletterSchemaType = z.infer<typeof NewsletterSchema>;

export const UserChangeDataSchema = z.object({
    firstName: z
    .string()
        .min(1, { message: "Дане поле повинно бути заповнене" }),
    lastName: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" }),
    email: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .email({ message: "Неправильний формат електронної пошти" }),
    phoneNumber: z
        .string()
        .regex(/^(\+?\d{1,4}[-.\s]?)?((\d{3}[-.\s]?){2}\d{4,7}|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4,7})$/, {
            message: "Неправильний формат номера телефону"
        }),
    dateOfBirth: z
        .string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Неправильний формат дати народження" })
});

export type UserChangeDataSchemaType = z.infer<typeof UserChangeDataSchema>;

export const UserAddressDataSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" }),
    surName: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" }),
    lastName: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" }),
    street: z
        .string()
        .min(2, { message: "Дане поле повинно бути заповнене" }),
    numberHome: z
        .string()
        .min(2, { message: "Дане поле повинно бути заповнене" }),
    zipIndex: z
        .string()
        .min(5, { message: "Дане поле повинно бути заповнене" }),
    region: z
        .string()
        .min(2, { message: "Дане поле повинно бути заповнене" }),
    residence: z
        .string()
        .min(2, { message: "Дане поле повинно бути заповнене" }),
    email: z
        .string()
        .min(1, { message: "Дане поле повинно бути заповнене" })
        .email({ message: "Неправильний формат електронної пошти" }),
    phoneNumber: z
        .string()
        .regex(/^(\+?\d{1,4}[-.\s]?)?((\d{3}[-.\s]?){2}\d{4,7}|\(\d{3}\)[-.\s]?\d{3}[-.\s]?\d{4,7})$/, {
            message: "Неправильний формат номера телефону"
        }),
});

export type UserAddressDataSchemaType = z.infer<typeof UserAddressDataSchema>;
