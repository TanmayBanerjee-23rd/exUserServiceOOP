import BaseValidator from "../utilities/baseValidator";
import { iOrderDTO } from "../utilities/DTO/Order";

class Validators extends BaseValidator<iOrderDTO> {

    onOrderCreation( orderObj: iOrderDTO ): boolean {

        return ( this.validateObjFields( orderObj, [ "productIds", "quantity", "amount", "deliveryAddress" ] ) );
    };
};

export default ( new Validators() );