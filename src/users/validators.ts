import BaseValidator from "../utilities/baseValidator";
import { iUserDTO } from "../utilities/DTO/User";
import { USER_TYPE } from "../utilities/ENUMS/User";

class Validators extends BaseValidator<iUserDTO> {

    onRegistration( userObj: iUserDTO ): boolean {

        const isFieldsMissing = ( this.validateObjFields( userObj, [ "email", "password", "phoneNumber", "userType" ] ) );

        return ( isFieldsMissing && ( userObj.userType === USER_TYPE.ADMIN || userObj.userType === USER_TYPE.NORMAL_USER ) );
    };

    validateUserObjOwner( req ) {

        return ( req.tokenData.decodedToken.userId === req.body.id );
    }
};

export default ( new Validators() );