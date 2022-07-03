import { iCategoryEntity } from "../db/entities/Category";
import { iCategoryDTO } from "../utilities/DTO/Category";

class CategoryMapper {

    mapToEntity( categoryObj: iCategoryDTO ): iCategoryEntity {

        return {
            name: categoryObj.name ? categoryObj.name : null,
            description: categoryObj.description ? categoryObj.description : null
        };
    };

    mapToDTO( categoryObj: iCategoryEntity ): iCategoryDTO {

        return {
            id: categoryObj.id,
            name: categoryObj.name,
            description: categoryObj.description
        };
    };

};

export default ( new CategoryMapper() );