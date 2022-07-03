import EventEmitterInstance from "./Instancetiator";

class OrdersEventsRegistrar {

    eventEmitter;
    constructor() {
        this.eventEmitter = EventEmitterInstance.getEmitterInstance();
    };

    registerEvents() {

        this.eventEmitter.on( "deliveryStatusChange", () => {
            console.log( "Mail should be sent to the user." );
        });
    };
};

export default ( new OrdersEventsRegistrar() );