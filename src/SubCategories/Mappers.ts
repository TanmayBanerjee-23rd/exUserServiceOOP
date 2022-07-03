import { iSubCategoryEntity } from "../db/entities/SubCategory";
import { iSubCategoryDTO } from "../utilities/DTO/SubCategory";

class SubCategoryMapper {

    mapToEntity( subCategoryObj: iSubCategoryDTO ): iSubCategoryEntity {

        return {
            name: subCategoryObj.name ? subCategoryObj.name : null,
            parentId: subCategoryObj.parentId ? subCategoryObj.parentId : null,
            description: subCategoryObj.description ? subCategoryObj.description : null
        };
    };

    mapToDTO( subCategoryObj: iSubCategoryEntity ): iSubCategoryDTO {

        return {
            id: subCategoryObj.id,
            name: subCategoryObj.name,
            parentId: subCategoryObj.parentId,
            description: subCategoryObj.description
        };
    };
};

export default ( new SubCategoryMapper() );