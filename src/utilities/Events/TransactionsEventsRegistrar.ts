import { iOrderEntity } from "../../db/entities/Order";
import OrderRepo from "../../db/repositories/OrderRepo";
import { EVENTS_NAMES } from "../ENUMS/Common";
import { TRXN_STATUS } from "../ENUMS/Transaction";
import EventEmitterInstance from "./Instancetiator";

class TransactionsEventsRegistrar {

    eventEmitter;
    constructor() {
        this.eventEmitter = EventEmitterInstance.getEmitterInstance();
    };

    registerEvents() {

        this.eventEmitter.on( EVENTS_NAMES.TRXN_STATUS_CHANGE, async ( transactionDetails: any ) => {

            let orderDetails: iOrderEntity = await OrderRepo.findOneById( transactionDetails.orderId );
            orderDetails.paymentStatus = ( transactionDetails.status === TRXN_STATUS.COMPLETED );
            await OrderRepo.updateOrderById( orderDetails, orderDetails.id );

            console.log( "Updated Order Status." );
        });
    };
};

export default ( new TransactionsEventsRegistrar() );