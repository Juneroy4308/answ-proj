import { zodResolver } from "@hookform/resolvers/zod";
import { IconLoader2 } from "@tabler/icons-react";
import { useAppSelector } from "app/hooks.ts";
import { getUser, updateEmail } from "app/userSlice.ts";
import { Attention, Button, Input, Label } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IErrorResponse } from "interfaces/index.ts";
import { NewEmailSchema, NewEmailSchemaType } from "interfaces/zod/password.ts";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useResetEmailMutation } from "services/user.ts";

import React from "react";

interface ChangeEmailFormProps {
    setIsEditingEmail: (value: boolean) => void;
}

const ChangeEmailForm: React.FC<ChangeEmailFormProps> = ({ setIsEditingEmail }) => {
    const user = useAppSelector(getUser);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewEmailSchemaType>({
        resolver: zodResolver(NewEmailSchema),
        defaultValues: {
            userId: Number(user?.id),
            newEmail: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
        },
    });

    const [resetEmail, { isLoading: isLoadingResetEmail }] = useResetEmailMutation();

    const onSubmit = async (data: NewEmailSchemaType) => {
        try {
            await resetEmail(data).unwrap();
            dispatch(updateEmail({ email: data.newEmail, firstName: data.firstName, lastName: data.lastName }));
            setIsEditingEmail(false);
            toast.success("Email успішно змінено!", toastOptions);
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast.error(`Помилка: ${errorResponse.data.message}`, toastOptions);
        }
    };

    return (
        <div>
            <div className="w-[410px] mt-[27px] space-y-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("userId")} />

                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="newEmail">Новий email</Label>
                            <Input id="newEmail" {...register("newEmail")} />
                            {errors.newEmail && <Attention>{errors.newEmail.message}</Attention>}
                        </div>

                        <div>
                            <Label htmlFor="firstName">Нове ім'я</Label>
                            <Input id="firstName" {...register("firstName")} />
                            {errors.firstName && <Attention>{errors.firstName.message}</Attention>}
                        </div>

                        <div>
                            <Label htmlFor="lastName">Нове прізвище</Label>
                            <Input id="lastName" {...register("lastName")} />
                            {errors.lastName && <Attention>{errors.lastName.message}</Attention>}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button variant="normalBorder" onClick={() => setIsEditingEmail(false)} disabled={isLoadingResetEmail}>
                            Анулювати
                        </Button>
                        <Button type="submit" disabled={isLoadingResetEmail}>
                            {isLoadingResetEmail ? <IconLoader2 className="animate-spin" /> : "Зберегти"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeEmailForm;
