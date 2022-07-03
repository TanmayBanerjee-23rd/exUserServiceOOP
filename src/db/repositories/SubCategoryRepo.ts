import PaginateRepo from './paginateRepo';
import SubCategories from "../models/SubCategories";
import { iSubCategoryEntity } from "../entities/SubCategory";


class SubCategoryRepo extends PaginateRepo<iSubCategoryEntity> {

    protected getModel() {
        return ( SubCategories.getSubCategoryModelInstance() );
    };

    async getAllSubCategories(): Promise<iSubCategoryEntity[]> {
        return ( await this.findAll( {} ) );
    };

    async getSubCategoryByName( name: string ): Promise<iSubCategoryEntity> {
        return ( await this.conditionalFindOne({ where: { name: name } }) );
    };
    
    async getSubCategoryByParentId( parenId: number ): Promise<iSubCategoryEntity> {
        return ( await this.conditionalFindOne({ where: { parenId: parenId } }) );
    };

    async updateSubCategoryById( subCategoryObj: iSubCategoryEntity, subCategoryId: number ): Promise<iSubCategoryEntity> {
        return ( await this.updateOne( subCategoryObj, { where: { id: subCategoryId } }) );
    };

    async deleteSubCategoryById( subCategoryId: number ): Promise<iSubCategoryEntity> {
        return ( await this.deleteOne({ id: subCategoryId }) );
    };
};

export default ( new SubCategoryRepo() );
