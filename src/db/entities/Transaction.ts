import { PAYMENT_GATEWAY, TRXN_STATUS } from "../../utilities/ENUMS/Transaction";

export interface iTransactionEntity {
    id?: number,
    userId: number,
    orderId: number,
    amount: number,
    paymentGateway: PAYMENT_GATEWAY,
    initiationTimeStamp: string,
    settlementTimeStamp: string,
    status: TRXN_STATUS,
    gatewayTransactionId?: string,
};