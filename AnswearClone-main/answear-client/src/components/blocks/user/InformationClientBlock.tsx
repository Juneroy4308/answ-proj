import React, { useState } from "react";
import {Button, Label} from "components/ui";
import ClientAddressModalForm from "components/form/ClientAddressModalForm.tsx";
import { UserAddressDataSchemaType } from "interfaces/zod/user.ts";
import {IconCircleCheckFilled} from "@tabler/icons-react"; // Імпортуйте тип

interface InformationClientBlockProps {
    setClientData: (data: UserAddressDataSchemaType | null) => void;
    clientData: UserAddressDataSchemaType | null;
}

const InformationClientBlock: React.FC<InformationClientBlockProps> = ({ setClientData, clientData }) => {
    const [isModalOpen, setModalOpen] = useState(false);


    const handleButtonClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = (data: UserAddressDataSchemaType) => {
        console.log("Received data in parent component:", data); // Додайте лог
        console.log("bool:", clientData); // Додайте лог

        setClientData(data); // Зберігаємо дані форми в стані
        setModalOpen(false); // Закриваємо модальне вікно після відправлення форми
    };

    return (
        <div className="bg-gray-100 p-6">
            <div className="flex items-center mb-4">
                {/*<div className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-full text-black font-semibold">*/}
                {/*    1*/}
                {/*</div>*/}
                <IconCircleCheckFilled size={36}/>
                <Label size="superBoldBlack" className="ml-4">Дані клієнта</Label>
            </div>
            <hr className="border-gray-300 mb-4" />

            {clientData ? (
                <div className="text-gray-700 mb-6">
                    <Label size="normal">{`${clientData.firstName} ${clientData.surName} ${clientData.lastName}`}</Label>
                    <Label size="normal">{clientData.email}</Label>
                    <Label size="normal">{clientData.phoneNumber}</Label>
                    <Label size="normal">{`${clientData.street} ${clientData.numberHome}`}</Label>
                    <Label size="normal">{`${clientData.zipIndex} ${clientData.residence}`}</Label>
                </div>
            ) : (
                <p className="text-gray-700 mb-6">
                    Вкажіть свою адресу, щоб перейти до наступного кроку
                </p>
            )}

            <Button size="full" onClick={handleButtonClick}>
                {clientData?"Редагувати інформацію про замовлення":"Додайте інформацію про замовлення"}
            </Button>

            {/* Модальне вікно */}
            <ClientAddressModalForm
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleFormSubmit} // Передаємо функцію обробки даних
            />
        </div>
    );
};

export default InformationClientBlock;
