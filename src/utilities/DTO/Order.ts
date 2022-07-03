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
    deliveryStatus?: "packed" | "shipped" | "outForDelivery" | "delivered",
    refundStatus?: boolean,
    paymentMode?: "Online" | "COD",
    isDeliveryStatusChanged?: boolean
};

export interface iOrderSummaryDTO {
    id?: number,
    quantity: number,
    amount: number,
    deliveryAddress: string,
    buyerId: number
};