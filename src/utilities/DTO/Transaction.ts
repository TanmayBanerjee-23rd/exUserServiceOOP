import { PAYMENT_GATEWAY, TRXN_STATUS } from "../ENUMS/Transaction"

export interface iTransactionDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount?: number,
    paymentGateway: PAYMENT_GATEWAY,
    initiationTimeStamp: string,
    settlementTimeStamp?: string,
    status?: TRXN_STATUS,
    gatewayTransactionId?: string,
    isPaymentStatusChanged?: boolean
};

export interface iTransactionSummaryDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    status: TRXN_STATUS,
    gatewayTransactionId?: string,
};

export interface iMakePaymentReqDTO {
    orderId: number,
    initiationTimeStamp: string,
    paymentGateway: PAYMENT_GATEWAY
};

export interface iMakePaymentResDTO {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    gatewayDetails: any
};