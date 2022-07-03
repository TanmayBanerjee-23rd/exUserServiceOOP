// User model

import { Model, DataTypes } from 'sequelize';
import { iUserEntity } from "../entities/User";

class MUser extends Model<iUserEntity> {
    declare id: number;
    declare firstName: string;
    declare middleName: string;
    declare lastName: string;
    declare email: string;
    declare password: string;
    declare phoneNumber: number;
    declare userType: "admin" | "normalUser";
};

class Users {

    intializeUsersModel( sequelize ) {
        MUser.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            firstName: DataTypes.STRING,
            middleName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            phoneNumber: DataTypes.BIGINT(),
            userType: {
                type: DataTypes.STRING,
                defaultValue: "normalUser",
                allowNull: false
            }
        }, {
            tableName: "Users",
            sequelize
        });
    };

    getUserModelInstance() {
        return MUser;
    };
};

export default ( new Users() );
