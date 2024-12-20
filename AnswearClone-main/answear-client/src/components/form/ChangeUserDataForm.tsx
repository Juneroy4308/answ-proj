import {zodResolver} from "@hookform/resolvers/zod";
import {Attention, Button, Input, Label} from "components/ui";
import {toastOptions} from "constants/toastOptions.ts";
import {IErrorResponse} from "interfaces/index.ts";

import {useForm, Controller} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {UserChangeDataSchema, UserChangeDataSchemaType} from "interfaces/zod/user.ts";
import {IUser} from "interfaces/user";

interface ChangeUserDataFormProps {
    setIsEditingUserInfo: (value: boolean) => void;
    user?: IUser | null
}



const ChangeUserDataForm: React.FC<ChangeUserDataFormProps> = ({setIsEditingUserInfo, user}) => {
    const navigate = useNavigate();

    const {
        control,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserChangeDataSchemaType>({
        resolver: zodResolver(UserChangeDataSchema),
    });

    const onSubmit = async () => {
        try {
            setIsEditingUserInfo(false); // Встановлення isEditingUserInfo у false після успішної відправки
            navigate("/auth/sign-in");
            toast.success("Пароль успішно змінено!", toastOptions);
        } catch (error) {
            const errorResponse = error as IErrorResponse;
            toast.error(`Помилка: ${errorResponse.data.message}`, toastOptions);
        }
    };

    return (
        <div>
            <div className="w-[410px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="firstName">Ім'я</Label>
                            <Input id="firstName" {...register("firstName")} defaultValue={user?.firstName}/>
                            {errors.firstName && <Attention>{errors.firstName.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="lastName">Прізвище</Label>
                            <Input id="lastName" {...register("lastName")} defaultValue={user?.lastName}/>
                            {errors.lastName && <Attention>{errors.lastName.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="email">Електронна пошта</Label>
                            <Input id="email" {...register("email")} defaultValue={user?.email}/>
                            {errors.email && <Attention>{errors.email.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber">Номер телефону</Label>
                            <Input id="phoneNumber" {...register("phoneNumber")} defaultValue={user?.phoneNumber}/>
                            {errors.phoneNumber && <Attention>{errors.phoneNumber.message}</Attention>}
                        </div>
                        <div>
                            <Label htmlFor="dateOfBirth">Дата народження</Label>
                            <Controller
                                name="dateOfBirth"
                                control={control}
                                defaultValue=""
                                render={({field, fieldState: {error}}) => (
                                    <div>
                                        <DatePicker
                                            selected={field.value ? new Date(field.value) : null}
                                            onChange={(date) => field.onChange(date ? date.toISOString().split('T')[0] : '')}
                                            dateFormat="yyyy-MM-dd"
                                            placeholderText="Виберіть дату народження"
                                        />
                                        {error && <Attention>{error.message}</Attention>}
                                    </div>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex justify-between mt-6">
                        <Button
                            variant="normalBorder"
                            onClick={() => setIsEditingUserInfo(false)}
                        >
                            Скасувати
                        </Button>
                        <Button type="submit">
                            Ок
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeUserDataForm;