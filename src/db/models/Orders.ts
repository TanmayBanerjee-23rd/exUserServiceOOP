// Products model

import { Model, DataTypes } from 'sequelize';
import { iOrderEntity } from '../entities/Order';

class MOrder extends Model<iOrderEntity> {

    declare id: number;
    declare productIds: number[];
    declare quantity: number;
    declare amount: number;
    declare deliveryAddress: string;
    declare buyerId: number;
    declare buyerName: string;
    declare deliveryETA: string;
    declare cancelStatus: boolean;
    declare deliveryStatus: boolean;
    declare refundStatus: boolean;
    declare paymentMode: string;
    declare paymentStatus: string;
};

class Orders {

    intializeOrderModel( sequelize ) {
        MOrder.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            productIds: {
                type: DataTypes.ARRAY,
                allowNull: false
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            amount: {
                type: DataTypes.DECIMAL( 10, 2),
                allowNull: false
            },
            deliveryAddress: DataTypes.STRING,
            buyerId: DataTypes.INTEGER,
            buyerName: DataTypes.STRING,
            deliveryETA: DataTypes.INTEGER,
            deliveryStatus: DataTypes.STRING,
            cancelStatus: DataTypes.BOOLEAN,
            refundStatus: DataTypes.BOOLEAN,
            paymentMode: DataTypes.STRING,
            paymentStatus: DataTypes.STRING
        }, {
            tableName: "Orders",
            sequelize
        });
    };

    getOrderModelInstance(){
        return MOrder;
    }
};

export default ( new Orders() );