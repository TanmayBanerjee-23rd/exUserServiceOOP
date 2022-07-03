import { EVENTS_NAMES } from "../ENUMS/Common";
import EventEmitterInstance from "./Instancetiator";

class OrdersEventsRegistrar {

    eventEmitter;
    constructor() {
        this.eventEmitter = EventEmitterInstance.getEmitterInstance();
    };

    registerEvents() {

        this.eventEmitter.on( EVENTS_NAMES.DELIVERY_STATUS_CHANGE, () => {
            console.log( "Mail should be sent to the user." );
        });
    };
};

export default ( new OrdersEventsRegistrar() );