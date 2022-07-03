import PaginateRepo from './paginateRepo';
import Categories from "../models/Categories";
import { iCategoryEntity } from "../entities/Category";


class CategoryRepo extends PaginateRepo<iCategoryEntity> {

    protected getModel() {
        return ( Categories.getCategoryModelInstance() );
    };

    async getAllCategories() {
        return ( await this.findAll( {} ) );
    };

    async getCategoryByName( name: string ) {
        return ( await this.conditionalFindOne({ where: { name: name }}) );
    };

    async updateCategoryById( categoryObj: iCategoryEntity, categoryId: number ) {
        return ( await this.updateOne( categoryObj, { where: { id: categoryId } }) );
    };

    async deleteCategoryById( categoryId: number ) {
        return ( await this.deleteOne({ id: categoryId }) );
    };
};

export default ( new CategoryRepo() );
