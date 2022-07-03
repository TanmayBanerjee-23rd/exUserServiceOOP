// Products model

import { Model, DataTypes } from 'sequelize';
import { iProductEntity } from "../entities/Product";

class MProduct extends Model<iProductEntity> {
    declare id: number;
    declare name: string;
    declare description: string;
    declare modelName: string;
    declare modelId: string;
    declare price: number;
    declare discount: number;
    declare sellername: string;
    declare sellerAddress: string;
    declare subCategoryId: number;
};

class Products {

    intializeProductsModel( sequelize ) {
        MProduct.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING,
            modelName: DataTypes.STRING,
            modelId: DataTypes.STRING,
            price: DataTypes.DECIMAL(10, 2),
            discount: DataTypes.BIGINT(),
            sellername: DataTypes.STRING,
            sellerAddress: DataTypes.STRING,
            subCategoryId: DataTypes.BIGINT()
        }, {
            tableName: "Products",
            sequelize
        });
    };

    getProductModelInstance(){
        return MProduct;
    }
};

export default ( new Products() );