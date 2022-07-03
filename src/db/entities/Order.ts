export interface iOrderEntity {
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
    paymentMode?: "Online" | "COD"
};