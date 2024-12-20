import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Attention, Button, Input, Label} from "components/ui";
//import {toast} from "react-toastify";
import {UserAddressDataSchema, UserAddressDataSchemaType} from "interfaces/zod/user.ts";
import {IconX} from "@tabler/icons-react";

interface ClientAddressModalFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: UserAddressDataSchemaType) => void;
}

const ClientAddressModalForm: React.FC<ClientAddressModalFormProps> = ({isOpen, onClose,onSubmit}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<UserAddressDataSchemaType>({
        resolver: zodResolver(UserAddressDataSchema),
    });

    useEffect(() => {
        // Блокуємо скрол основного сайту, коли модальне вікно відкрите
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto"; // Відновлення скролу при розмонтуванні
        };
    }, [isOpen]);

    // const onSubmit = async (data: UserAddressDataSchemaType) => {
    //     try {
    //         // API запит або інша логіка
    //         toast.success("Акаунт успішно створено!", {autoClose: 3000});
    //     } catch (error) {
    //         toast.error(`Помилка: ${error.message}`, {autoClose: 3000});
    //     }
    // };
    // const handleFormSubmit = (data: UserAddressDataSchemaType) => {
    //     console.log("Submitted data from modal:", data); // Додайте лог
    //     onSubmit(data); // Передаємо дані наверх у компонент `InformationClientBlock`
    // };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div
                className="max-w-[560px] w-full max-h-[100vh] overflow-y-auto bg-white  relative"
            >
                <IconX
                    className="absolute top-[22px] right-4 text-gray-600 hover:text-gray-800"
                    stroke={2}
                    onClick={onClose}
                />
                <div className="">
                    <Label size="superBoldBlack" className="px-8 py-4">Додайте інформацію про замовлення</Label>
                    <Label size="bold" className="pb-4 px-8 border-t">Адресні дані</Label>
                </div>
                <div className="px-8 pb-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-md">
                        <div>
                            <Label htmlFor="firstName">Ім'я*</Label>
                            <Input type="text" id="firstName" {...register("firstName")} className="w-full mt-2"/>
                            {errors.firstName && <Attention>{errors.firstName.message}</Attention>}

                            <Label htmlFor="surName">Прізвище*</Label>
                            <Input type="text" id="surName" {...register("surName")} className="w-full mt-2"/>
                            {errors.surName && <Attention>{errors.surName.message}</Attention>}

                            <Label htmlFor="lastName">По-батькові*</Label>
                            <Input type="text" id="lastName" {...register("lastName")} className="w-full mt-2"/>
                            {errors.lastName && <Attention>{errors.lastName.message}</Attention>}

                            <Label htmlFor="street">Вулиця*</Label>
                            <Input type="text" id="street" {...register("street")} className="w-full mt-2"/>
                            {errors.street && <Attention>{errors.street.message}</Attention>}

                            <Label htmlFor="numberHome">Номер будинку*</Label>
                            <Input type="text" id="numberHome" {...register("numberHome")} className="w-full mt-2"/>
                            {errors.numberHome && <Attention>{errors.numberHome.message}</Attention>}

                            <Label htmlFor="zipIndex">Поштовий індекс*</Label>
                            <Input type="text" id="zipIndex" {...register("zipIndex")} className="w-full mt-2"/>
                            {errors.zipIndex && <Attention>{errors.zipIndex.message}</Attention>}

                            <Label htmlFor="region">Область*</Label>
                            <Input type="text" id="region" {...register("region")} className="w-full mt-2"/>
                            {errors.region && <Attention>{errors.region.message}</Attention>}

                            <Label htmlFor="residence">Місто*</Label>
                            <Input type="text" id="residence" {...register("residence")} className="w-full mt-2"/>
                            {errors.residence && <Attention>{errors.residence.message}</Attention>}

                            <Label htmlFor="email">Електронна пошта*</Label>
                            <Input type="email" id="email" {...register("email")} className="w-full mt-2"/>
                            {errors.email && <Attention>{errors.email.message}</Attention>}

                            <Label htmlFor="phoneNumber">Телефон*</Label>
                            <Input type="text" id="phoneNumber" {...register("phoneNumber")} className="w-full mt-2"/>
                            {errors.phoneNumber && <Attention>{errors.phoneNumber.message}</Attention>}
                        </div>
                        <div className="flex items-center justify-center">
                            <Button size="full">Зберегти</Button>
                        </div>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default ClientAddressModalForm;
