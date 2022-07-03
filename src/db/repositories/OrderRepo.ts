import PaginateRepo from "./paginateRepo";
import Orders from "../models/Orders";
import { iOrderEntity } from "../entities/Order";

const OFFSET = 0;
const ROW_COUNT = 25;

class OrderRepo extends PaginateRepo<iOrderEntity> {

    protected getModel() {
        return ( Orders.getOrderModelInstance() );
    };

    async getAllOrders( userType: "admin" | "normalUser", userId: number ): Promise<iOrderEntity[]> {
        
        let conditionObj: any = {};

        if ( userType === "normalUser" ) {
            conditionObj.where = { buyerId: userId };
        }

        return ( await this.findAll( conditionObj ) );
    };

    async getAllOrdersPageWise( userType: "admin" | "normalUser", userId: number, offSet: number, rowCount: number ): Promise<iOrderEntity[]> {

        let conditionObj: any = {};

        if ( userType === "normalUser" ) {
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