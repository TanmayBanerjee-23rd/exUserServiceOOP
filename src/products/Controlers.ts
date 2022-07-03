import ProductRepo from "../db/repositories/ProductRepo";
import ProductMapper from "./Mappers";
import { iProductEntity } from "../db/entities/Product";
import { iProductDTO, iProductSummaryDTO } from "../utilities/DTO/Product";


class ProductController {

    async createProduct( productObj: iProductDTO ): Promise<iProductSummaryDTO> {

        const productEntity: iProductEntity = ProductMapper.mapToProductEntity( productObj );

        const createdProductEntity = await ProductRepo.create( productEntity ) ;

        return Promise.resolve( ProductMapper.mapToSummaryDTO( createdProductEntity ) );
    };

    async getAllProducts(): Promise<iProductSummaryDTO[]> {

        const productEntities: iProductEntity[] = await ProductRepo.getAllProducts();

        const productDTOs: iProductSummaryDTO[] = productEntities.map( productEntity => ProductMapper.mapToSummaryDTO( productEntity ) );

        return Promise.resolve( productDTOs );
    };

    async getProductById( productId: number, responseType: string ): Promise<iProductDTO | iProductSummaryDTO> {

        const productEntity: iProductEntity = await ProductRepo.findOneById( productId );

        let productDTO: iProductDTO | iProductSummaryDTO;

        if ( responseType === "summary" ) productDTO = ProductMapper.mapToSummaryDTO( productEntity );
        else productDTO = ProductMapper.mapToProductDTO( productEntity );

        return Promise.resolve( productDTO );
    };

    async updateProduct( productId: number, productObj: iProductDTO ): Promise<iProductSummaryDTO> {

        const productEntity: iProductEntity = ProductMapper.mapToProductEntity( productObj );

        const updatedProductEntity: iProductEntity = ( await ProductRepo.updateProductById( productEntity ,
            productId ) );
        
        return ProductMapper.mapToSummaryDTO( updatedProductEntity );
    };

    async deleteProduct( productId: number ): Promise<iProductSummaryDTO> {

        const productEntity: iProductEntity = await ProductRepo.deleteProductById( productId );

        return Promise.resolve( ProductMapper.mapToSummaryDTO( productEntity ) );
    };
};

export default ( new ProductController() );