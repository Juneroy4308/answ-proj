import { IProductVariation } from "interfaces/product";

export interface IOrder {
    id: number;
    userId: number;
    orderContactInfo: IOrderContactInfo;
    orderItems: IOrderItem[];
    orderStatus: IOrderStatus;
    orderStatusId: number;
}

export interface IOrderContactInfo {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
}

export interface IOrderItem {
    productVariationId: number;
    productVariation: IProductVariation;
    count: number;
    price: number;
}

export interface IOrderStatus {
    id: number;
    name: string;
}

export interface ICreateOrder {
    userId: number;
    orderContactInfo: IOrderCreateContactInfo;
}

interface IOrderCreateContactInfo {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    city: string;
    address: string;
}
