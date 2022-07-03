import ProductRepo from "../db/repositories/ProductRepo";
import ProductMapper from "../products/Mappers";
import { iProductDTO } from "../utilities/DTO/Product";
import { iProductEntity } from "../db/entities/Product";
import { iProductSearchDTO } from "../utilities/DTO/Search";

class SearchController {

    async getProducts( queryObj: iProductSearchDTO ): Promise<iProductDTO[]> {
        
        const productEntities: iProductEntity[] = await ProductRepo.searchProducts( queryObj ) ;

        const productDTOs: iProductDTO[] = productEntities.map( productEntity => ProductMapper.mapToProductDTO( productEntity ) )

        return Promise.resolve( productDTOs );
    }
};

export default ( new SearchController() );