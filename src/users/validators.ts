import BaseValidator from "../utilities/baseValidator";
import { iUserDTO } from "../utilities/DTO/User";

class Validators extends BaseValidator<iUserDTO> {

    onRegistration( userObj: iUserDTO ): boolean {

        const isFieldsMissing = ( this.validateObjFields( userObj, [ "email", "password", "phoneNumber", "userType" ] ) );

        return ( isFieldsMissing && ( userObj.userType === "admin" || userObj.userType === "normalUser" ) );
    };

    validateUserObjOwner( req ) {

        return ( req.tokenData.decodedToken.userId === req.body.id );
    }
};

export default ( new Validators() );