// Products model

import { Model, DataTypes } from 'sequelize';
import { iTransactionEntity } from '../entities/Transaction';

class MTransaction extends Model<iTransactionEntity> {

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
    declare paymentMode: "Online" | "COD";
};

class Transactions {

    intializeTransactionModel( sequelize ) {
        MTransaction.init({
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                unique: true,
                autoIncrement: true,
                primaryKey: true
            },
            amount: {
                type: DataTypes.DECIMAL( 10, 2),
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            orderId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paymentGateway: {
                type: DataTypes.STRING,
                allowNull: false
            },
            initiationTimeStamp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            settlementTimeStamp: DataTypes.STRING,
            status: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gatewayTransactionId: DataTypes.STRING,
        }, {
            tableName: "Transactions",
            sequelize
        });
    };

    getTransactionModelInstance(){
        return MTransaction;
    }
};

export default ( new Transactions() );