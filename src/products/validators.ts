import BaseValidator from "../utilities/baseValidator";
import { iProductDTO } from "../utilities/DTO/Product";

class Validators extends BaseValidator<iProductDTO> {

    onProductCreation( productObj: iProductDTO ): boolean {

        return ( this.validateObjFields( productObj, [ "name", "modelName", "modelId", "price", "subCategoryId" ] ) );
    };
};

export default ( new Validators() );