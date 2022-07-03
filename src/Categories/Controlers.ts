import CategoryRepo from "../db/repositories/CategoryRepo";
import CategoryMapper from "./Mappers";
import { iCategoryEntity } from "../db/entities/Category";
import { iCategoryDTO } from "../utilities/DTO/Category";

class CategoryController {

    async createCategory( categoryObj: iCategoryDTO ): Promise<iCategoryDTO> {

        const categoryEntity: iCategoryEntity = CategoryMapper.mapToEntity( categoryObj );

        return Promise.resolve( CategoryMapper.mapToDTO( await CategoryRepo.create( categoryEntity ) ) );
    };

    async getAllCategories(): Promise<iCategoryDTO[]> {

        return Promise.resolve( ( await CategoryRepo.getAllCategories() )
                .map( ( categoryEntity: iCategoryEntity ) => CategoryMapper.mapToDTO( categoryEntity ) ) );
    };

    async getCategoryById( categoryId: number ): Promise<iCategoryDTO> {
        return Promise.resolve( CategoryMapper.mapToDTO( await CategoryRepo.findOneById( categoryId ) ) );
    };

    async updateCategory( categoryId: number, categoryObj: iCategoryDTO ): Promise<iCategoryDTO> {

        const categoryEntity: iCategoryEntity = CategoryMapper.mapToEntity( categoryObj );

        return Promise.resolve( CategoryMapper.mapToDTO( await CategoryRepo.updateCategoryById( categoryEntity ,
            categoryId ) ) );
    };

    async deleteCategory( categoryId: number ): Promise<iCategoryDTO> {
        
        return Promise.resolve( CategoryMapper.mapToDTO( await CategoryRepo.deleteCategoryById( categoryId ) ) );
    };
};

export default ( new CategoryController() );
