import { iProductEntity } from "../db/entities/Product";
import { iProductDTO, iProductSummaryDTO } from "../utilities/DTO/Product";

class ProductMapper {

    mapToProductEntity( productObj: iProductDTO ): iProductEntity{

        return ({
            name: productObj.name ? productObj.name : null,
            description: productObj.description ? productObj.description : null,
            modelName: productObj.modelName ? productObj.modelName : null,
            modelId: productObj.modelId ? productObj.modelId : null,
            price: productObj.price ? productObj.price : null ,
            discount: productObj.discount ? productObj.discount : null,
            sellername: productObj.sellername ? productObj.sellername : null,
            sellerAddress: productObj.sellerAddress ? productObj.sellerAddress : null,
            subCategoryId: productObj.subCategoryId ? productObj.subCategoryId : null
        });
    };

    mapToProductDTO( productObj: iProductEntity ): iProductDTO {

        return ({
            id: productObj.id,
            name: productObj.name,
            description: productObj.description,
            modelName: productObj.modelName,
            modelId: productObj.modelId,
            price: productObj.price,
            discount: productObj.discount,
            sellername: productObj.sellername,
            sellerAddress: productObj.sellerAddress,
            subCategoryId: productObj.subCategoryId
        });
    };

    mapToSummaryDTO( productObj: iProductEntity ): iProductSummaryDTO {
        
        return {
            id: productObj.id,
            price: productObj.price,
            name: productObj.name
        };
    };
};

export default ( new ProductMapper() );