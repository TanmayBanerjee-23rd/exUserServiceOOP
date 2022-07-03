// SubCategory model

import { Model, DataTypes } from 'sequelize';
import { iSubCategoryEntity } from "../entities/SubCategory";

class MSubCategory extends Model<iSubCategoryEntity> {
    declare id: number;
    declare parentId: number;
    declare name: string;
    declare description: string;
};

class SubCategories {

    intializeSubCategoryModel( sequelize ) {
        MSubCategory.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            parentId: DataTypes.INTEGER,
            name: DataTypes.STRING,
            description: DataTypes.STRING
        }, {
            tableName: "SubCategories",
            sequelize
        });
    };

    getSubCategoryModelInstance(){
        return MSubCategory;
    }
};

export default ( new SubCategories() );