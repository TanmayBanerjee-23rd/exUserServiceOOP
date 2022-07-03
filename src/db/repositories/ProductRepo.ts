import PaginateRepo from './paginateRepo';
import Products from "../models/Products";
import { iProductEntity } from "../entities/Product";
import { iProductSearchDTO } from '../../utilities/DTO/Search';


const OFFSET = 0;
const ROW_COUNT = 25;

class ProductRepo extends PaginateRepo<iProductEntity> {

    protected getModel() {
        return ( Products.getProductModelInstance() );
    };

    async getAllProducts(): Promise<iProductEntity[]> {
        return ( await this.findAll( {} ) );
    };

    async getAllProductsPageWise( offSet: number, rowCount: number ): Promise<iProductEntity[]> {
        return ( await this.findAllPageWise( {}, offSet || OFFSET, rowCount || ROW_COUNT ) );
    }

    async getProductByModelName( modelName: string ): Promise<iProductEntity> {
        return ( await this.conditionalFindOne({ where: { modelName: modelName }}) );
    };

    async getProductByModelId( modelId: string ): Promise<iProductEntity> {
        return ( await this.conditionalFindOne({ where: { modelId: modelId }}) );
    };

    async getProductBySellerName( sellername: string ): Promise<iProductEntity> {
        return ( await this.conditionalFindOne({ where: { sellername: sellername }}) );
    };

    async updateProductById( productObj: iProductEntity, productId: number ): Promise<iProductEntity> {
        return ( await this.updateOne( productObj, { where: { id: productId } }) );
    };

    async deleteProductById( productId: number ): Promise<iProductEntity> {
        return ( await this.deleteOne({ id: productId }) );
    };

    async searchProducts( queryObj: iProductSearchDTO ): Promise<iProductEntity[]> {
        
        let querStr: string = "SELECT PD.* FROM PRODUCTS AS PD";
        let joinClauses: string = "";
        let whereClauses: string[] = [];
        const offSet = queryObj.offSet || OFFSET;
        const rowCount = queryObj.rowCount || ROW_COUNT;

        if ( queryObj.categoryId ) {
            joinClauses += ` LEFT JOIN SUBCATEGORIES AS SG ON PD.subCategoryId = SG.id LEFT JOIN CATEGORIES AS CG ON SG.parentId = CG.id`;
            whereClauses.push( ` CG.id = ${ queryObj.categoryId }` );
        }

        if ( queryObj.subCategoryId ) {
            whereClauses.push( ` PD.subCategoryId = ${ queryObj.subCategoryId }` );
        }

        if ( queryObj.productName ) {
            whereClauses.push( ` PD.name = '${ queryObj.productName }'` );
        }

        if ( queryObj.priceRange ) {

            const priceRanges: string[] = queryObj.priceRange.split( '-' );
            whereClauses.push( ` PD.price > ${ priceRanges[ 0 ] } AND PD.price < ${ priceRanges[ 1 ] }` );
        }

        querStr += joinClauses + " WHERE " + whereClauses.join( " AND " ) + ` LIMIT ${ rowCount } OFFSET ${ offSet }`;

        return ( await this.query( querStr ) );
    }
};

export default ( new ProductRepo() );
