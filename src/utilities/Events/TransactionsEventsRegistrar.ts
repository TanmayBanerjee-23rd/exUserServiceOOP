import EventEmitterInstance from "./Instancetiator";

class TransactionsEventsRegistrar {

    eventEmitter;
    constructor() {
        this.eventEmitter = EventEmitterInstance.getEmitterInstance();
    };

    registerEvents() {

        this.eventEmitter.on( "transactionStatusChange", ( transactionDetails: any ) => {
            console.log( "Do stuff on trxn status change :: ", transactionDetails );
        });
    };
};

export default ( new TransactionsEventsRegistrar() );