export interface iTransactionDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    paymentGateway: "STRIPE" | "PAYTM" | "RAZOR_PAY",
    initiationTimeStamp: string,
    settlementTimeStamp?: string,
    status: "INITIATED" | "PROCESSING" | "COMPLETED" | "FAILED",
    gatewayTransactionId?: string,
    isPaymentStatusChanged?: boolean
};

export interface iTransactionSummaryDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    status: "INITIATED" | "PROCESSING" | "COMPLETED" | "FAILED",
    gatewayTransactionId?: string,
};

export interface iMakePaymentDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    gatewayDetails: any
};