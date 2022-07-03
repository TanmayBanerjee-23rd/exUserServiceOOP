import { iTransactionEntity } from "../db/entities/Transaction";
import { iMakePaymentReqDTO, iTransactionDTO, iTransactionSummaryDTO, iMakePaymentResDTO } from "../utilities/DTO/Transaction";
import GatewayProvider from "../PaymentGateways/Provider";
class TransactionMapper {

    mapToEntity( transactionObj: iTransactionDTO ): iTransactionEntity{

        return ({
            userId: transactionObj.userId ? transactionObj.userId : null,
            orderId: transactionObj.orderId ? transactionObj.orderId : null,
            amount: transactionObj.amount ? transactionObj.amount : null,
            paymentGateway: transactionObj.paymentGateway ? transactionObj.paymentGateway : null,
            initiationTimeStamp: transactionObj.initiationTimeStamp ? transactionObj.initiationTimeStamp : null ,
            settlementTimeStamp: transactionObj.settlementTimeStamp ? transactionObj.settlementTimeStamp : null,
            status: transactionObj.status ? transactionObj.status : null,
            gatewayTransactionId: transactionObj.gatewayTransactionId ? transactionObj.gatewayTransactionId : null
        });
    };

    mapToDTO( transactionObj: iTransactionEntity ): iTransactionDTO {

        return ({
            id: transactionObj.id,
            userId: transactionObj.userId,
            orderId: transactionObj.orderId,
            amount: transactionObj.amount,
            paymentGateway: transactionObj.paymentGateway,
            initiationTimeStamp: transactionObj.initiationTimeStamp,
            settlementTimeStamp: transactionObj.settlementTimeStamp,
            status: transactionObj.status,
            gatewayTransactionId: transactionObj.gatewayTransactionId
        });
    };

    mapToSummaryDTO( transactionObj: iTransactionEntity ): iTransactionSummaryDTO {

        return {
            id: transactionObj.id,
            orderId: transactionObj.orderId,
            amount: transactionObj.amount,
            status: transactionObj.status,
            userId: transactionObj.userId
        };
    };

    async mapToMakePaymentResDTO( transactionObj: iTransactionEntity ): Promise<iMakePaymentResDTO> {
        
        const paymentGateway = GatewayProvider.providePaymentGateWay( transactionObj.paymentGateway );
        const paymentDetails = await paymentGateway.makePayment();

        return {
            id: transactionObj.id,
            orderId: transactionObj.orderId,
            amount: transactionObj.amount,
            userId: transactionObj.userId,
            gatewayDetails: paymentDetails
        };
    };

};

export default ( new TransactionMapper() );