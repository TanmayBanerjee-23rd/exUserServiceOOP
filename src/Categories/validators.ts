import BaseValidator from "../utilities/baseValidator";
import { iCategoryDTO } from "../utilities/DTO/Category";

class Validators extends BaseValidator<iCategoryDTO> {

    onCategoryCreation( categoryObj: iCategoryDTO ): boolean {

        return ( this.validateObjFields( categoryObj, [ "name" ] ) );
    };
};

export default ( new Validators() );