import { useAppSelector } from "app/hooks.ts";
import { getUser } from "app/userSlice.ts";
import { Attention, Button, Label } from "components/ui";
import CheckBox from "components/ui/CheckBox";
import { toastOptions } from "constants/toastOptions.ts";
import { UserAddressDataSchemaType } from "interfaces/zod/user.ts";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useClearBasketMutation, useGetBasketItemsQuery } from "services/basket.ts";
import { useCreateOrderMutation } from "services/order.ts";
import { z } from "zod";

import React, { useState } from "react";

// Import Zod for validation

interface TotalBasketFormProps {
    clientData: UserAddressDataSchemaType | null;
}

const TotalBasketForm: React.FC<TotalBasketFormProps> = ({ clientData }) => {
    const [selectedOptionPayment, setSelectedOptionPayment] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const { data: basketProducts } = useGetBasketItemsQuery();

    const user = useAppSelector(getUser);

    const [createOrder] = useCreateOrderMutation();
    const [clearBasket] = useClearBasketMutation();
    const navigate = useNavigate();

    // Validation schema using Zod
    const validationSchema = z.object({
        agreeToTerms: z.boolean().refine((val) => val, {
            message: "Будь ласка, ознайомтеся і погодьтеся з Правилами",
        }),
    });

    const handleSubmit = async () => {
        try {
            const result = validationSchema.safeParse({ agreeToTerms });

            if (clientData === null) {
                throw new Error("Дані клієнта не заповнені.");
            }

            if (result.success) {
                await createOrder({
                    userId: user?.id || 0,
                    orderContactInfo: {
                        firstName: clientData?.firstName || "",
                        lastName: clientData?.lastName || "",
                        phone: clientData?.phoneNumber || "",
                        email: clientData?.email || "",
                        city: clientData?.region || "",
                        address: clientData?.street + " " + clientData?.numberHome,
                    },
                }).unwrap();

                clearBasket();

                navigate("/");
                toast.success("Замовлення успішно створено", toastOptions);
            } else {
                console.error(result.error.errors);
                toast.error(result.error.errors[0].message, toastOptions);
            }
        } catch (e) {
            toast.error("Необхідно заповнити всі поля.", toastOptions);
        }
    };

    return (
        <div>
            <div className="flex items-center mb-4">
                <Label size="superBoldBlack">Вартість замовлення</Label>
            </div>
            <hr className="border-gray-300 mb-4" />
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="flex items-center justify-between">
                    <Label size="normal">Сума товарів:</Label>
                    <Label size="normal">
                        {basketProducts?.reduce((sum, item) => sum + item.count * item.productVariation.price, 0)} грн
                    </Label>
                </div>
                <div className="flex items-center justify-between">
                    <Label size="normal">Сума знижки:</Label>
                    <Label size="normal">0 грн</Label>
                </div>
                <div className="flex items-center justify-between">
                    <Label size="normal">Вартість доставки:</Label>
                    <Label size="normal">179 грн</Label>
                </div>
                <div className="flex items-center justify-between pb-[30px]">
                    <Label size="bigBold">Оплата</Label>
                    <Label size="bigBold">
                        {basketProducts?.reduce((sum, item) => sum + item.count * item.productVariation.price, 179)} грн грн
                    </Label>
                </div>
                <div>
                    <Label size="sm" className="text-[#585858]">
                        Адміністратором персональних даних є Answear S.A. З тим, як ми обробляємо Ваші персональні дані Ви можете
                        ознайомитись ТУТ.Повернути товар Ви можете протягом 30 днів. Більш детально тут.
                    </Label>
                </div>
                <div className="flex justify-start space-x-2">
                    <div>
                        <CheckBox
                            checked={selectedOptionPayment}
                            onChange={() => setSelectedOptionPayment(!selectedOptionPayment)}
                        />
                    </div>
                    <div>
                        <Label size="sm" className="text-[#585858]">
                            Я даю згоду на те, щоб партнер Answear.com S.A. надіслав мені - TrustMate S.A. анкету задоволеності
                            щодо цього замовлення.
                        </Label>
                    </div>
                </div>
                <div>
                    <div className="flex justify-start space-x-2">
                        <div>
                            <CheckBox checked={agreeToTerms} onChange={() => setAgreeToTerms(!agreeToTerms)} />
                        </div>
                        <div>
                            <Label size="sm" className="text-[#585858]">
                                Погоджуюсь з Правилами магазину*
                            </Label>
                        </div>
                    </div>
                    {!agreeToTerms && <Attention>Будь ласка, ознайомтеся і погодьтеся з Правилами</Attention>}
                </div>

                <div>
                    <Label size="sm" className="text-[#585858]">
                        Контролером ваших персональних даних є PayU S.A. з зареєстрованим офісом у Познані (60-166), на вулиці
                        Grunwaldzka 186 ("PayU"). Ваші персональні дані оброблятимуться з метою обробки платіжної транзакції,
                        повідомлення про статус цього платежу, розгляду скарг, а також для виконання юридичних зобов’язань,
                        покладених на PayU. Читати далі.
                    </Label>
                </div>

                <div className="mt-4">
                    <Button size="full" onClick={handleSubmit}>
                        Купую та оплачую
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default TotalBasketForm;
