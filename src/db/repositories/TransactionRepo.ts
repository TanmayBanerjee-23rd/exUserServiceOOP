import PaginateRepo from "./paginateRepo";
import Transactions from "../models/Transactions";
import { iTransactionEntity } from "../entities/Transaction";
import { USER_TYPE } from "../../utilities/ENUMS/User";

const OFFSET = 0;
const ROW_COUNT = 25;

class TransactionRepo extends PaginateRepo<iTransactionEntity> {

    protected getModel() {
        return ( Transactions.getTransactionModelInstance() );
    };

    async getAllTransactions( userType: USER_TYPE, userId: number ): Promise<iTransactionEntity[]> {
        
        let conditionObj: any = {};

        if ( userType === USER_TYPE.NORMAL_USER ) {
            conditionObj.where = { userId: userId };
        }

        return ( await this.findAll( conditionObj ) );
    };

    async getAllTransactionsPageWise( userType: USER_TYPE, userId: number, offSet: number, rowCount: number ): Promise<iTransactionEntity[]> {

        let conditionObj: any = {};

        if ( userType === USER_TYPE.NORMAL_USER ) {
            conditionObj.where = { userId: userId };
        }

        return ( await this.findAllPageWise(  conditionObj, offSet || OFFSET, rowCount || ROW_COUNT ) );
    };

    async getTransactionByGatewayId( gatewayTransactionId: string ) {
        return ( await this.conditionalFindOne({ where: { gatewayTransactionId: gatewayTransactionId }}) );
    };

    async updateTransactionById( transactionObj: iTransactionEntity, transactionId: number ): Promise<iTransactionEntity> {
        return ( await this.updateOne( transactionObj, { where: { id: transactionId } }) );
    };

    async deleteTransactionById( transactionId: number ): Promise<iTransactionEntity> {
        return ( await this.deleteOne({ id: transactionId }) );
    };
};

export default ( new TransactionRepo() );