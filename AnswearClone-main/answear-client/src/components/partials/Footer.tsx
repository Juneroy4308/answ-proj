import { Label, Link } from "components/ui";

const Footer = () => {
    const links = ["Політика конфіденційності", "Правила", "Дані компанії", "Усі Кукіс", "Мапа сайту"];

    const countryLinks = ["BG", "CY", "CZ", "GR", "HR", "HU", "IT", "PL", "RO", "SI", "SK", "UA", "UA(RU)"];

    return (
        <div className="flex flex-col px-6 lg:px-12">
            <div className="lg:flex lg:flex-row lg:justify-between lg:border-t lg:border-slate-200 lg:border-none">
                <div className="py-6 border-t border-slate-200 lg:border-none lg:flex lg:flex-row lg:space-x-4 lg:pb-0">
                    {links.map((linkText, index) => (
                        <Link key={index} variant="none" size="span">
                            {linkText}
                        </Link>
                    ))}
                </div>
                <div className="py-6 border-t border-slate-200 lg:flex lg:flex-row lg:space-x-4 lg:border-none">
                    <Label className="lg:py-3">WEARETHEANSWEAR IN:</Label>
                    <div>
                        {countryLinks.map((country, index) => (
                            <Link key={index} variant="none" size="noneLeft">
                                {country}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="py-4 border-t border-slate-200 text-[11px] text-center lg:border-none lg:text-left lg:pt-0">
                Вміст цього веб-сайту захищений авторським правом і належить Answear.com S.A.
            </div>
        </div>
    );
};

export default Footer;
