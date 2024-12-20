import { zodResolver } from "@hookform/resolvers/zod";
import { IconEye, IconLoader2 } from "@tabler/icons-react";
import { useAppSelector } from "app/hooks.ts";
import { getToken, getUser } from "app/userSlice.ts";
import { Attention, Button, InputPassword, Label } from "components/ui";
import { toastOptions } from "constants/toastOptions.ts";
import { IErrorResponse } from "interfaces/index.ts";
import { NewPasswordSchema, NewPasswordSchemaType } from "interfaces/zod/password";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useResetPasswordMutation } from "services/user.ts";

import React from "react";

interface ChangePasswordFormProps {
    setIsEditingPassword: (value: boolean) => void;
}

const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({ setIsEditingPassword }) => {
    const user = useAppSelector(getUser);
    const token = useAppSelector(getToken);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewPasswordSchemaType>({
        resolver: zodResolver(NewPasswordSchema),
        defaultValues: {
            token: token || "",
            email: user?.email,
        },
    });

    const [resetPassword, { isLoading: isLoadingResetPassword }] = useResetPasswordMutation();

    const onSubmit = async (data: NewPasswordSchemaType) => {
        try {
            await resetPassword(data).unwrap();
            setIsEditingPassword(false);
            toast.success("Пароль успішно змінено!", toastOptions);
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast.error(`Помилка: ${errorResponse.data.message}`, toastOptions);
        }
    };

    return (
        <div>
            <div className="w-full max-w-xl  space-y-8">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("token")} />
                    <input type="hidden" {...register("email")} />
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="password">Новий пароль</Label>
                            <InputPassword id="password" icon={<IconEye />} {...register("password")} />
                            {errors.password && <Attention>{errors.password.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="passwordRepeat">Повторіть новий пароль</Label>
                            <InputPassword id="passwordRepeat" icon={<IconEye />} {...register("passwordRepeat")} />
                            {errors.passwordRepeat && <Attention>{errors.passwordRepeat.message}</Attention>}
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="normalBorder"
                            onClick={() => setIsEditingPassword(false)}
                            disabled={isLoadingResetPassword}
                        >
                            Анулювати
                        </Button>
                        <Button type="submit" disabled={isLoadingResetPassword}>
                            {isLoadingResetPassword ? <IconLoader2 className="animate-spin" /> : "Зберегти"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordForm;
