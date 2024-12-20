import { IProductVariation } from "interfaces/product";

export interface BasketItem {
    productVariationId: number;
    productVariation: IProductVariation;
    count: number;
}

export interface BasketCreateItem {
    productVariationId: number;
    count: number;
}
