import { DELIVERY_STATUS, PATMENT_MODE } from "../ENUMS/Order"

export interface iOrderDTO {
    id?: number,
    productIds: number[],
    quantity: number,
    amount: number,
    deliveryAddress: string,
    buyerId: number,
    buyerName?: string,
    deliveryETA?: string,
    cancelStatus?: boolean,
    deliveryStatus?: DELIVERY_STATUS,
    refundStatus?: boolean,
    paymentMode?: PATMENT_MODE,
    paymentStatus: boolean,
    isDeliveryStatusChanged?: boolean
};

export interface iOrderSummaryDTO {
    id?: number,
    quantity: number,
    amount: number,
    deliveryAddress: string,
    buyerId: number
};