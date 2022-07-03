import BaseValidator from "../utilities/baseValidator";
import { iTransactionDTO } from "../utilities/DTO/Transaction";

class Validators extends BaseValidator<iTransactionDTO> {

    onTransactionCreation( orderObj: iTransactionDTO ): boolean {

        return ( this.validateObjFields( orderObj, [ "orderId", "userId", "amount", "paymentGateway", "initiationTimeStamp", "status" ] ) );
    };
};

export default ( new Validators() );