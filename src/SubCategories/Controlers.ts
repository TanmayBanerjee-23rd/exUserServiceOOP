import SubCategoryRepo from "../db/repositories/SubCategoryRepo";
import SubCategoryMapper from "./Mappers";
import { iSubCategoryEntity } from "../db/entities/SubCategory";
import { iSubCategoryDTO } from "../utilities/DTO/SubCategory";

class SubCategoryController {

    async createSubCategory( subCategoryObj: iSubCategoryDTO ): Promise<iSubCategoryDTO> {

        const subCategoryEntityObj: iSubCategoryEntity = SubCategoryMapper.mapToEntity( subCategoryObj );
        return SubCategoryMapper.mapToDTO( await SubCategoryRepo.create( subCategoryEntityObj ) );
    };

    async getAllSubCategories(): Promise<iSubCategoryDTO[]> {

        return Promise.resolve( ( await SubCategoryRepo.getAllSubCategories() )
                .map( ( subCategory: iSubCategoryEntity ) => SubCategoryMapper.mapToDTO( subCategory ) ) );
    };

    async getSubCategoryById( subCategoryId: number ): Promise<iSubCategoryDTO> {

        return Promise.resolve( SubCategoryMapper.mapToDTO( await SubCategoryRepo.findOneById( subCategoryId ) ) );
    };

    async updateSubCategory( subCategoryId: number, subCategoryObj: iSubCategoryDTO ): Promise<iSubCategoryDTO> {

        const subCategoryEntityObj: iSubCategoryEntity = SubCategoryMapper.mapToEntity( subCategoryObj );

        return Promise.resolve( SubCategoryMapper.mapToDTO( await SubCategoryRepo.updateSubCategoryById( subCategoryEntityObj ,
            subCategoryId ) ) );
    };

    async deleteSubCategory( subCategoryId: number ): Promise<iSubCategoryDTO> {
        return Promise.resolve( SubCategoryMapper.mapToDTO( await SubCategoryRepo.deleteSubCategoryById( subCategoryId ) ) );
    };
};

export default ( new SubCategoryController() );
