import PaytmGateway from "./Paytm/Gateway";

class GatewayProvider {

    providePaymentGateWay( gatewayType: string ) {

        switch ( gatewayType ) {
            case "PAYTM":
                return PaytmGateway;
            default:
                break;
        }
    }
};

export default ( new GatewayProvider() );