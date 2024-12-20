import React, {Dispatch, SetStateAction} from "react";
import CheckBox from "components/ui/CheckBox";
import {Label} from "components/ui";
import {IconCircleCheckFilled} from "@tabler/icons-react";

interface PaymentFormProps {
    selectedOptionDelivery: string;
    selectedOptionPayment: string;
    setSelectedOptionPayment: Dispatch<SetStateAction<string>>;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ selectedOptionDelivery,selectedOptionPayment,setSelectedOptionPayment }) => {


    const handleOptionChange = (option: string) => {
        setSelectedOptionPayment(option);
    };

    return (
        <div className={`bg-gray-100 p-6 ${
            !selectedOptionDelivery ? "opacity-50 pointer-events-none" : ""
        }`}>
            <div className="flex items-center mb-4">
                {selectedOptionDelivery ? (
                    <IconCircleCheckFilled size={36} />
                ) : (
                    <div
                        className="w-8 h-8 flex items-center justify-center border-2 border-black rounded-full text-black font-semibold"
                    >
                        3
                    </div>
                )}
                <Label size="superBoldBlack" className="ml-4">Оплата</Label>
            </div>
            <hr className="border-gray-300 mb-4" />
            <form className="mt-8 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckBox
                            checked={selectedOptionPayment === "card"}
                            onChange={() => handleOptionChange("card")}
                        />
                        <img
                            src="https://img2.ans-media.com/ua/cms/media/661d07b1ea2a21.49811017.png"
                            alt="cardLogo"
                            className="rounded-lg w-[48px] h-[30px]"
                        />
                        <Label size="bold">
                            Оплата карткою
                        </Label>
                    </div>
                    <Label size="bold">0 грн</Label>
                </div>
                <div className="ml-9">
                    <Label>
                        Картка Visa, Mastercard, Maestro
                    </Label>
                </div>
                <hr className="border-gray-200 mb-4"/>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckBox
                            checked={selectedOptionPayment === "google_pay"}
                            onChange={() => handleOptionChange("google_pay")}
                        />
                        <img
                            src="https://img2.ans-media.com/ua/cms/media/6610014b021b35.40533859.png"
                            alt="google_payLogo"
                            className="rounded-full w-[48px] h-[30px]"
                        />
                        <Label size="bold">
                            Google Pay
                        </Label>
                    </div>
                    <Label size="bold">0 грн</Label>
                </div>
                <div className="ml-9">
                    <Label>
                        Швидка оплата за допомогою Google Wallet
                    </Label>
                </div>
                <hr className="border-gray-200 mb-4"/>
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <CheckBox
                            checked={selectedOptionPayment === "novaPoshta"}
                            onChange={() => handleOptionChange("novaPoshta")}
                        />
                        <img
                            src="https://img2.ans-media.com/ua/cms/media/661d07be0e21b8.36445536.png"
                            alt="google_payLogo"
                            className="rounded-lg w-[48px] h-[30px]"
                        />
                        <Label size="bold">
                            Післяплата
                        </Label>
                    </div>
                    <Label size="bold">25 грн</Label>
                </div>
                <div className="ml-9">
                    <Label>
                        Можлива лише для замовлень з обраною доставкою Кур'єром Meest Express
                    </Label>
                </div>
            </form>
        </div>
    );
};

export default PaymentForm;
