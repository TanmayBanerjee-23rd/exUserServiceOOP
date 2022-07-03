import PaginateRepo from "./paginateRepo";
import Orders from "../models/Orders";
import { iOrderEntity } from "../entities/Order";
import { USER_TYPE } from "../../utilities/ENUMS/User";

const OFFSET = 0;
const ROW_COUNT = 25;

class OrderRepo extends PaginateRepo<iOrderEntity> {

    protected getModel() {
        return ( Orders.getOrderModelInstance() );
    };

    async getAllOrders( userType: USER_TYPE, userId: number ): Promise<iOrderEntity[]> {
        
        let conditionObj: any = {};

        if ( userType === USER_TYPE.NORMAL_USER ) {
            conditionObj.where = { buyerId: userId };
        }

        return ( await this.findAll( conditionObj ) );
    };

    async getAllOrdersPageWise( userType: USER_TYPE, userId: number, offSet: number, rowCount: number ): Promise<iOrderEntity[]> {

        let conditionObj: any = {};

        if ( userType === USER_TYPE.NORMAL_USER ) {
            conditionObj.where = { buyerId: userId };
        }

        return ( await this.findAllPageWise( conditionObj, offSet || OFFSET, rowCount || ROW_COUNT ) );
    };

    async updateOrderById( orderObj: iOrderEntity, orderId: number ): Promise<iOrderEntity> {
        return ( await this.updateOne( orderObj, { where: { id: orderId } }) );
    };

    async deleteOrderById( orderId: number ): Promise<iOrderEntity> {
        return ( await this.deleteOne({ id: orderId }) );
    };
};

export default ( new OrderRepo() );