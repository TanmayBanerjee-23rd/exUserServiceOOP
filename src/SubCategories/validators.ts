import BaseValidator from "../utilities/baseValidator";
import { iSubCategoryDTO } from "../utilities/DTO/SubCategory";

class Validators extends BaseValidator<iSubCategoryDTO> {

    onSubCategoryCreation( subCategoryObj: iSubCategoryDTO ): boolean {

        return ( this.validateObjFields( subCategoryObj, [ "name", "parentId" ] ) );
    };
};

export default ( new Validators() );