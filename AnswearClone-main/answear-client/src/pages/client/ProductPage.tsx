import {
    IconChevronDown,
    IconCircleLetterA,
    IconClockCheck,
    IconHeart,
    IconRuler2,
    IconShoppingBag,
    IconTruckDelivery,
} from "@tabler/icons-react";
import RelatedProducts from "components/blocks/RelatedProducts.tsx";
import PhotosGallery from "components/partials/PhotosGallery.tsx";
import { Button, Option, Select } from "components/ui";
import { IProductVariation } from "interfaces/product";
import { useNavigate, useParams } from "react-router-dom";
import { useAddToBasketMutation, useGetBasketItemsQuery } from "services/basket.ts";
import {
    useDeleteFavoritProductMutation,
    useGetFavoritProductsQuery,
    useGetProductBySlugQuery,
    useSetFavoritProductsMutation,
} from "services/product.ts";

import React, { useEffect, useState } from "react";

const ClientProductPage = () => {
    const { slug } = useParams();

    const [currentVariant, setCurrentVariant] = useState<IProductVariation | null>(null);
    const [openDimensionalGrid, setOpenDimensionalGrid] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleSelectChange = (newSlug: string) => {
        navigate(`/product/${newSlug}`); // Змінює URL на новий slug
    };
    //const [currentSlug, setCurrentSlug] = useState<string>(slug || "");

    const [openDescription, setOpenDescription] = useState<boolean>(false);
    const [openDelivery, setOpenDelivery] = useState<boolean>(false);
    const [openReturn, setOpenReturn] = useState<boolean>(false);
    const [isFavorited, setIsFavorited] = useState(false);

    const { data: product } = useGetProductBySlugQuery(slug || "");
    const { data: basket } = useGetBasketItemsQuery();
    const { data: favoritProducts } = useGetFavoritProductsQuery();

    const [addBasket] = useAddToBasketMutation();
    const [deleteFavoritProduct] = useDeleteFavoritProductMutation();
    const [addFavoritProduct] = useSetFavoritProductsMutation();

    useEffect(() => {
        if (product && slug) {
            const variant = product.variations.find((v: IProductVariation) => v.slug === slug);
            setCurrentVariant(variant || null);
        }
    }, [product, slug]);

    useEffect(() => {
        if (product && favoritProducts) {
            setIsFavorited(favoritProducts.some((favoritProduct) => favoritProduct.id === product.id));
        }
    }, [product, favoritProducts]);

    const addToBasket = () => {
        addBasket({ productVariationId: currentVariant?.id || 0, count: 1 });
    };

    const handleFavoriteToggle = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isFavorited) {
            deleteFavoritProduct(product?.id || 0);
        } else {
            addFavoritProduct(product?.id || 0);
        }
        setIsFavorited(!isFavorited);
    };

    return (
        <div className="flex flex-col w-full pt-[30px] bg-white">
            <div className="grid grid-cols-2 w-full px-[60px]">
                <div className="col-span-1">
                    <PhotosGallery photos={currentVariant?.photos || []} />
                </div>
                <div className="col-span-1 flex flex-col">
                    <div>
                        <h1 className="text-[18px] font-semibold">{product?.name}</h1>
                        <p className="text-[14px] leading-[22px]">{currentVariant?.shortDescription}</p>
                        <p className="my-[10px] text-[18px] text-[#c60c0c] font-normal">{currentVariant?.price} грн</p>
                        <div>
                            <div className="p-4 bg-[#f4f4f4]">
                                <div className="flex items-center">
                                    <IconRuler2 className="mr-2" />
                                    <h3 className="font-normal text-[12px] flex-1">Стандартна розмірна сітка</h3>
                                    <button onClick={() => setOpenDimensionalGrid(!openDimensionalGrid)}>
                                        <IconChevronDown
                                            className={`transition duration-300 ${openDimensionalGrid ? "rotate-180" : "rotate-0"}`}
                                        />
                                    </button>
                                </div>
                                {openDimensionalGrid ? (
                                    <p className="text-[12px] font-light text-gray-700 pt-2">
                                        Ми рекомендуємо вибирати той розмір, який Ви зазвичай носите. Рекомендації засновані на
                                        вимірах товару та розмірній сітці бренду.
                                    </p>
                                ) : (
                                    <></>
                                )}
                            </div>

                            <a
                                target="_blank"
                                href="https://garnamama.com/ua/storinka/viznachennya-rozmiriv.html"
                                className="cursor-pointer"
                            >
                                <p className="mt-2 underline text-gray-700 font-light text-[12px] text-right">Розмірна сітка</p>
                            </a>

                            <div className="mt-4">
                                <Select defaultValue={currentVariant?.slug} onChange={(e) => handleSelectChange(e.target.value)}>
                                    {product?.variations.map((v: IProductVariation) => (
                                        <Option key={v.id} value={v.slug}>
                                            {v.shortDescription}
                                        </Option>
                                    ))}
                                </Select>
                            </div>

                            <div>
                                <div className="flex gap-[50px] justify-between items-center my-4">
                                    <Button
                                        onClick={addToBasket}
                                        size="full"
                                        disabled={!!basket?.find((item) => item.productVariationId === currentVariant?.id)}
                                    >
                                        {basket?.find((item) => item.productVariationId === currentVariant?.id)
                                            ? "В кошику"
                                            : "Додати у кошик"}
                                        <IconShoppingBag />
                                    </Button>
                                    <Button variant={"icon"} size="iconlg">
                                        <IconHeart
                                            fill={`${isFavorited ? "red" : "none"}`}
                                            className={`w-full h-full p-2 cursor-pointer ${isFavorited ? "text-red-500" : "text-gray-400"} hover:text-red-500`}
                                            onClick={handleFavoriteToggle}
                                        />
                                    </Button>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-2 items-center">
                                        <IconTruckDelivery />
                                        <p className="font-normal text-xs flex items-center mb-0 pl-3">
                                            Безкоштовна доставка з ЄС (при покупці від 2500 грн)
                                        </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <IconClockCheck />
                                        <p className="font-normal text-xs flex items-center mb-0 pl-3">30 днів на повернення</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <IconCircleLetterA />
                                        <p className="font-normal text-xs flex items-center mb-0 pl-3">
                                            Заощаджуй з Answear Club
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[14px] font-semibold border-t-2 mt-4 border-black">
                                <div className="py-[20px] border-b-2 border-black flex flex-col">
                                    <div className="flex justify-between w-full">
                                        <p>Опис товару</p>
                                        <button onClick={() => setOpenDescription(!openDescription)}>
                                            <IconChevronDown
                                                className={`transition duration-300 ${openDescription ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </button>
                                    </div>

                                    {openDescription ? (
                                        <p className="pt-4 text-justify">
                                            <span className="font-light">{product?.description}</span>
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="py-[20px] border-b-2 border-black flex flex-col">
                                    <div className="flex justify-between w-full">
                                        <p>Доставка</p>
                                        <button onClick={() => setOpenDelivery(!openDelivery)}>
                                            <IconChevronDown
                                                className={`transition duration-300 ${openDelivery ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </button>
                                    </div>

                                    {openDelivery ? (
                                        <p className="pt-4 text-justify">
                                            <span className="font-light">
                                                Товар, придбаний на ANSWEAR може бути доставлений: а) У відділення Нова Пошта; б)
                                                Кур'єром Meest ПОШТА. Стандартний термін доставки складає 4-7 робочих днів.
                                                Вартість доставки - 179 грн. Доставка замовлень БЕЗКОШТОВНА при покупці на суму
                                                від 2500 грн. Доставка усіх замовлень здійснюється міжнародною поштово-логістичною
                                                компанією Meest ПОШТА. Після прибуття замовлення в Україну, посилка передається
                                                компанії Нова Пошта на доставку у її відділення (у разі вибору Відділення Нова
                                                Пошта в якості бажаного виду доставки).
                                            </span>
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                                <div className="py-[20px] border-b-2 border-black flex flex-col">
                                    <div className="flex justify-between w-full">
                                        <p>Повернення та Рекламація</p>
                                        <button onClick={() => setOpenReturn(!openReturn)}>
                                            <IconChevronDown
                                                className={`transition duration-300 ${openReturn ? "rotate-180" : "rotate-0"}`}
                                            />
                                        </button>
                                    </div>

                                    {openReturn ? (
                                        <p className="pt-4 text-justify">
                                            <span className="font-light">
                                                Придбаний в магазині answear.ua товар ви завжди можете повернути протягом 30
                                                календарних днів з моменту отримання посилки*, за умови, якщо він не був у вжитку,
                                                а його оригінальна упаковка (безпосередньо та, в якій ви отримали сам товар – це
                                                коробка від взуття чи пакет від одягу, аксесуарів) товарний вигляд і споживчі
                                                властивості (етикетки, ярлики, що містять характеристики товару) збережені.
                                                *Згідно з Додатком № 3 до постанови Кабінету Міністрів України від 19 березня 1994
                                                р N 172, поверненню НЕ підлягають: пухо-пір’яні вироби (згідно із рішенням
                                                магазину ANSWEAR.ua, куртки та пальто із пухо-пір’яним наповненням повертати
                                                дозволено); рукавиці; тканини; білизна натільна, а саме: труси, бюстгалтери і
                                                купальники (чоловічі плавки), боді, сліпи, піжами, нічні сорочки, майки (що
                                                трактуються як натільна нижня білизна), кальсони; панчішно-шкарпеткові вироби;
                                                товари в аерозольній упаковці маски ювелірні вироби з дорогоцінних металів,
                                                дорогоцінного каміння, дорогоцінного каміння органогенного утворення та
                                                напівдорогоцінного каміння.
                                            </span>
                                        </p>
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {product ? <RelatedProducts id={product.id} /> : null}
        </div>
    );
};

export default ClientProductPage;
