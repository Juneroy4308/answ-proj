import React, { useState } from "react";
import { Label, Link } from "components/ui";
import { IconPlus, IconMinus } from "@tabler/icons-react";
import InfoBlockMobile from "components/blocks/InfoBlockMobile.tsx";

const HelpBlockMobile: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null); // Відкритий блок

    const toggleOpen = (index: number) => {
        setOpenIndex(openIndex === index ? null : index); // Закрити, якщо відкритий той самий блок
    };

    const renderBlock = (index: number, title: string, links: string[]) => (
        <div className="px-6" key={index}>
            <div
                className="flex justify-between py-4 border-t border-slate-200 cursor-pointer"
                onClick={() => toggleOpen(index)}
            >
                <Label size="bold">{title}</Label>
                <div
                    className={`transition-transform duration-500 ${openIndex === index ? "rotate-180" : ""}`}
                >
                    {openIndex === index ? <IconMinus stroke={1.25} /> : <IconPlus stroke={1.25} />}
                </div>
            </div>
            {openIndex === index && (
                <div className="flex flex-col pb-6">
                    {links.map((link, idx) => (
                        <Link key={idx} variant="none" size="span">{link}</Link>
                    ))}
                </div>
            )}
        </div>
    );

    return (
        <>
            {renderBlock(0, "ДОПОМОГА ТА ІНФОРМАЦІЯ", [
                "Про ANSWEAR.ua",
                "Правила магазину ANSWEAR.ua",
                "Умови повернення",
                "Рекламація",
                "Запакуй на подарунок",
                "Співпраця",
                "Правила ANSWEARClub",
                "Що потрібно знати, купуючи товар дорожче 150 євро?",
                "Поширені запитання",
                "Контакт",
                "Корпоративна соціальна відповідальність",
                "Повідомлення про порушення",
                "Політика конфіденційності",
            ])}
            {renderBlock(1, "ДОСТАВКА", [
                "У відділення Нова Пошта",
                "Кур'єром Meest ПОШТА",
            ])}
            {renderBlock(2, "ОПЛАТА", [
                "Банківською карткою",
                "Післяплата",
            ])}
            <InfoBlockMobile/>
        </>
    );
};

export default HelpBlockMobile;
