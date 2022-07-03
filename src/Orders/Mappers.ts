import { iOrderEntity } from "../db/entities/Order";
import { iOrderDTO, iOrderSummaryDTO } from "../utilities/DTO/Order";

class OrderMapper {

    mapToEntity( orderObj: iOrderDTO ): iOrderEntity{

        return ({
            productIds: orderObj.productIds ? orderObj.productIds : null,
            buyerId: orderObj.buyerId ? orderObj.buyerId : null,
            quantity: orderObj.quantity ? orderObj.quantity : null,
            amount: orderObj.amount ? orderObj.amount : null,
            deliveryAddress: orderObj.deliveryAddress ? orderObj.deliveryAddress : null,
            buyerName: orderObj.buyerName ? orderObj.buyerName : null ,
            deliveryETA: orderObj.deliveryETA ? orderObj.deliveryETA : null,
            cancelStatus: orderObj.cancelStatus ? orderObj.cancelStatus : null,
            deliveryStatus: orderObj.deliveryStatus ? orderObj.deliveryStatus : null,
            refundStatus: orderObj.refundStatus ? orderObj.refundStatus : null,
            paymentMode: orderObj.paymentMode ? orderObj.paymentMode : null,
            paymentStatus: orderObj.paymentStatus ? orderObj.paymentStatus: null
        });
    };

    mapToDTO( orderObj: iOrderEntity ): iOrderDTO {

        return ({
            id: orderObj.id,
            productIds: orderObj.productIds,
            buyerId: orderObj.buyerId,
            quantity: orderObj.quantity,
            amount: orderObj.amount,
            deliveryAddress: orderObj.deliveryAddress,
            buyerName: orderObj.buyerName,
            deliveryETA: orderObj.deliveryETA,
            cancelStatus: orderObj.cancelStatus,
            deliveryStatus: orderObj.deliveryStatus,
            refundStatus: orderObj.refundStatus,
            paymentMode: orderObj.paymentMode,
            paymentStatus: orderObj.paymentStatus
        });
    };

    mapToSummaryDTO( orderObj: iOrderEntity ): iOrderSummaryDTO {
        
        return {
            id: orderObj.id,
            buyerId: orderObj.buyerId,
            quantity: orderObj.quantity,
            amount: orderObj.amount,
            deliveryAddress: orderObj.deliveryAddress
        };
    };

};

export default ( new OrderMapper() );