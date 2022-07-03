import OrderRepo from "../db/repositories/OrderRepo";
import OrderMapper from "./Mappers";
import EventsInstancetiator from "../utilities/Events/Instancetiator";
import { iOrderEntity } from "../db/entities/Order";
import { iOrderDTO, iOrderSummaryDTO } from "../utilities/DTO/Order";
import { USER_TYPE } from "../utilities/ENUMS/User";
import { EVENTS_NAMES, RESPONSE_TYPE } from "../utilities/ENUMS/Common";


class OrderController {

    eventEmitter;

    constructor() {
        this.eventEmitter = EventsInstancetiator.getEmitterInstance();
    };

    async createOrder( orderObj: iOrderDTO ): Promise<iOrderSummaryDTO> {

        const orderEntity: iOrderEntity = OrderMapper.mapToEntity( orderObj );

        const createdOrderEntity = await OrderRepo.create( orderEntity ) ;

        return Promise.resolve( OrderMapper.mapToSummaryDTO( createdOrderEntity ) );
    };

    async getAllOrders( userType: USER_TYPE, userId: number ): Promise<iOrderSummaryDTO[]> {

        const orderEntities: iOrderEntity[] = await OrderRepo.getAllOrders( userType, userId );

        const orderDTOs: iOrderSummaryDTO[] = orderEntities.map( orderEntity => OrderMapper.mapToSummaryDTO( orderEntity ) );

        return Promise.resolve( orderDTOs );
    };

    async getOrderById( orderId: number, responseType: string ): Promise<iOrderDTO | iOrderSummaryDTO> {

        const orderEntity: iOrderEntity = await OrderRepo.findOneById( orderId );

        let orderDTO: iOrderDTO | iOrderSummaryDTO;

        if ( responseType === RESPONSE_TYPE.SUMMARY ) orderDTO = OrderMapper.mapToSummaryDTO( orderEntity );
        else orderDTO = OrderMapper.mapToDTO( orderEntity );

        return Promise.resolve( orderDTO );
    };

    async updateOrder( orderId: number, orderObj: iOrderDTO ): Promise<iOrderSummaryDTO> {

        const orderEntity: iOrderEntity = OrderMapper.mapToEntity( orderObj );

        const updatedOrderEntity: iOrderEntity = ( await OrderRepo.updateOrderById( orderEntity ,
            orderId ) );

        if ( orderObj.isDeliveryStatusChanged ) {
            this.eventEmitter.emit( EVENTS_NAMES.DELIVERY_STATUS_CHANGE );
        }
        
        return OrderMapper.mapToSummaryDTO( updatedOrderEntity );
    };

    async deleteOrder( orderId: number ): Promise<iOrderSummaryDTO> {

        const orderEntity: iOrderEntity = await OrderRepo.deleteOrderById( orderId );

        return Promise.resolve( OrderMapper.mapToSummaryDTO( orderEntity ) );
    };
};

export default ( new OrderController() );