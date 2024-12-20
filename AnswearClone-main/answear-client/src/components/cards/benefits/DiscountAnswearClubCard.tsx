import Button from "components/ui/Button.tsx";
import { useNavigate } from "react-router-dom";

import React from "react";

const DiscountAnswearClubCard: React.FC = () => {
    const navigate = useNavigate();

    const handleToAC = () => {
        navigate("/ac");
    };

    return (
        <div className="flex-col py-[65px] pr-4 lg:px-24 bg-gray-100 lg:w-1/2 ">
            <div className="flex items-center ml-4">
                <div className="flex items-center justify-center w-8 h-8 p-4 rounded-full border-3 border-black text-black font-bold text-lg">
                    AC
                </div>
                <h2 className="text-2xl font-bold ml-3">Answear Club</h2>
            </div>

            <div className="ml-4 ">
                <p className="text-sm mt-4">
                    Отримуй <span className="font-bold bg-white px-[2.8px]">5%</span> від вартості кожного замовлення та знижуй
                    ціну на товари до -50%!
                </p>
                <Button onClick={handleToAC} className="mt-8 max-w-[200px]">
                    Дізнатися більше
                </Button>
            </div>
        </div>
    );
};

export default DiscountAnswearClubCard;
