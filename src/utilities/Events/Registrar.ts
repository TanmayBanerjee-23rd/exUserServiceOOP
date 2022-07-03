import OrdersEventsRegistrar from "./OrdersEventsRegistrar";
import TransactionsEventsRegistrar from "./TransactionsEventsRegistrar";

class EventsRegistrar {

    register() {

        OrdersEventsRegistrar.registerEvents();
        TransactionsEventsRegistrar.registerEvents();
    };
};

export default ( new EventsRegistrar() );