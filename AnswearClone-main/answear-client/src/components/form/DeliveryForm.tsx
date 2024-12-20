import React, {Dispatch, SetStateAction} from "react";
import CheckBox from "components/ui/CheckBox";
import {Label} from "components/ui";
import {UserAddressDataSchemaType} from "interfaces/zod/user.ts";
import {IconCircleCheckFilled} from "@tabler/icons-react";

interface DeliveryFormProps {
    clientData: UserAddressDataSchemaType | null;
    setSelectedOptionDelivery: Dispatch<SetStateAction<string>>;
    selectedOptionDelivery: string;
}

const DeliveryForm: React.FC<DeliveryFormProps> = ({ clientData,selectedOptionDelivery,setSelectedOptionDelivery }) => {


    const handleOptionChange = (option: string) => {
        setSelectedOptionDelivery(option);
    };

    return (
        <div className={`bg-gray-100 p-6 ${
            !clientData ? "opacity-50 pointer-events-none" : ""
        }`}>
            <div className="flex items-center mb-4">
                {clientData ? (
                    <IconCircleCheckFilled size={36} />
                ) : (
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-full text-black font-semibold"
                    >
                        2
                    </div>
                )}
                <Label size="superBoldBlack" className="ml-4">Доставка</Label>
            </div>
            <hr className="border-gray-300 mb-4" />
            <form className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckBox
                            checked={selectedOptionDelivery === "meest"}
                            onChange={() => handleOptionChange("meest")}
                        />
                        <img
                            src="https://img2.ans-media.com/ua/cms/footer/64e8b918239727.82594220"
                            alt="Meest"
                            className="rounded-lg w-[51.2px] h-[32px]"
                        />
                        <Label size="bold" className="ml-4">
                            Кур'єром Meest ПОШТА
                        </Label>
                    </div>
                    <Label size="bold">179 грн</Label>
                </div>
                <div className="ml-9">
                    <Label>
                        Післяплата. Банківськими картками Visa, MasterCard, Maestro. Електронними гаманцями - Google Pay
                        або Apple Pay.
                    </Label>
                </div>
                <hr className="border-gray-200 mb-4"/>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckBox
                            checked={selectedOptionDelivery === "novaPoshta"}
                            onChange={() => handleOptionChange("novaPoshta")}
                        />
                        <img
                            src="https://img2.ans-media.com/ua/cms/footer/60ac44057d5433.37893271"
                            alt="Nova Poshta"
                            className="bg-white rounded-lg w-[50px] h-[32px]"
                        />
                        <Label size="bold" className="ml-4">
                            Відділення Нова Пошта
                        </Label>
                    </div>
                    <Label size="bold">179 грн</Label>
                </div>
                <div className="ml-9">
                    <Label>
                        Оплата карткою Visa, MasterCard, Maestro або ж електронними гаманцями - Google Pay або Apple Pay
                    </Label>
                </div>
                <hr className="border-gray-200 mb-4"/>
            </form>
        </div>
    );
};

export default DeliveryForm;
