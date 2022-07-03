// Category model

import { Model, DataTypes } from 'sequelize';
import { iCategoryEntity } from "../entities/Category";

class MCategory extends Model<iCategoryEntity> {
    declare id: number;
    declare name: string;
    declare description: string;
};

class Categories {

    intializeCategoryModel( sequelize ) {
        MCategory.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            name: DataTypes.STRING,
            description: DataTypes.STRING
        }, {
            tableName: "Categories",
            sequelize
        });
    };

    getCategoryModelInstance(){
        return MCategory;
    }
};

export default ( new Categories() );