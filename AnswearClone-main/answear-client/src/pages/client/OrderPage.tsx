import InformationClientBlock from "components/blocks/user/InformationClientBlock.tsx";
import BasketCard from "components/cards/BasketCard.tsx";
import DeliveryForm from "components/form/DeliveryForm.tsx";
import PaymentForm from "components/form/PaymentForm.tsx";
import TotalBasketForm from "components/form/TotalBasketForm.tsx";
import { UserAddressDataSchemaType } from "interfaces/zod/user.ts";

import { useState } from "react";

const OrderPage = () => {
    const [clientData, setClientData] = useState<UserAddressDataSchemaType | null>(null);
    const [selectedOptionDelivery, setSelectedOptionDelivery] = useState<string>("");
    const [selectedOptionPayment, setSelectedOptionPayment] = useState<string>("");
    return (
        <div>
            <div className="flex  justify-center py-4 space-x-8">
                {/* Передаємо `setClientData` для оновлення даних клієнта */}
                <div className="space-y-4">
                    <InformationClientBlock setClientData={setClientData} clientData={clientData} />
                    {/* Передаємо `clientData` у `DeliveryForm` */}
                    <DeliveryForm
                        clientData={clientData}
                        setSelectedOptionDelivery={setSelectedOptionDelivery}
                        selectedOptionDelivery={selectedOptionDelivery}
                    />
                    <PaymentForm
                        selectedOptionDelivery={selectedOptionDelivery}
                        selectedOptionPayment={selectedOptionPayment}
                        setSelectedOptionPayment={setSelectedOptionPayment}
                    />
                </div>
                <div className="w-[442px] space-y-4">
                    <BasketCard />
                    <TotalBasketForm clientData={clientData} />
                </div>
            </div>
        </div>
    );
};

export default OrderPage;
