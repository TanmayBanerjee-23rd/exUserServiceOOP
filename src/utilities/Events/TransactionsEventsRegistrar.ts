import { iOrderEntity } from "../../db/entities/Order";
import OrderRepo from "../../db/repositories/OrderRepo";
import { TRXN_STATUS } from "../ENUMS/Transaction";
import EventEmitterInstance from "./Instancetiator";

class TransactionsEventsRegistrar {

    eventEmitter;
    constructor() {
        this.eventEmitter = EventEmitterInstance.getEmitterInstance();
    };

    registerEvents() {

        this.eventEmitter.on( "transactionStatusChange", async ( transactionDetails: any ) => {

            let orderDetails: iOrderEntity = await OrderRepo.findOneById( transactionDetails.orderId );
            orderDetails.paymentStatus = ( transactionDetails.status === TRXN_STATUS.COMPLETED );
            await OrderRepo.updateOrderById( orderDetails, orderDetails.id );

            console.log( "Updated Order Status." );
        });
    };
};

export default ( new TransactionsEventsRegistrar() );