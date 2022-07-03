export interface iTransactionEntity {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    paymentGateway: "STRIPE" | "PAYTM" | "RAZOR_PAY",
    initiationTimeStamp: string,
    settlementTimeStamp: string,
    status: "INITIATED" | "PROCESSING" | "COMPLETED" | "FAILED",
    gatewayTransactionId?: string,
};