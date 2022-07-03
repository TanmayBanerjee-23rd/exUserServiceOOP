import TransactionRepo from "../db/repositories/TransactionRepo";
import TransactionMapper from "./Mappers";
import EventsInstancetiator from "../utilities/Events/Instancetiator";
import { iTransactionEntity } from "../db/entities/Transaction";
import { iMakePaymentReqDTO,iTransactionDTO, iTransactionSummaryDTO, iMakePaymentResDTO } from "../utilities/DTO/Transaction";
import OrderRepo from "../db/repositories/OrderRepo";
import { iOrderEntity } from "../db/entities/Order";
import { TRXN_STATUS } from "../utilities/ENUMS/Transaction";
import { USER_TYPE } from "../utilities/ENUMS/User";
import { EVENTS_NAMES, RESPONSE_TYPE } from "../utilities/ENUMS/Common";


class TransactionController {

    eventEmitter;

    constructor() {
        this.eventEmitter = EventsInstancetiator.getEmitterInstance();
    };

    async createTransaction( transactionObj: iMakePaymentReqDTO, userId: number ): Promise<iMakePaymentResDTO> {

        const orderDetails: iOrderEntity = await OrderRepo.findOneById( transactionObj.orderId );

        const newTransactionObj: iTransactionDTO = {
            ...transactionObj,
            userId,
            amount: orderDetails.amount
        };

        const transactionEntity: iTransactionEntity = TransactionMapper.mapToEntity( newTransactionObj );

        const createdTransactionEntity = await TransactionRepo.create( transactionEntity ) ;

        return Promise.resolve( TransactionMapper.mapToMakePaymentResDTO( createdTransactionEntity ) );
    };

    async getAllTransactions( userType: USER_TYPE, userId: number ): Promise<iTransactionSummaryDTO[]> {

        const transactionEntities: iTransactionEntity[] = await TransactionRepo.getAllTransactions( userType, userId );

        const transactionDTOs: iTransactionSummaryDTO[] = transactionEntities.map( transactionEntity => TransactionMapper.mapToSummaryDTO( transactionEntity ) );

        return Promise.resolve( transactionDTOs );
    };

    async getTransactionById( transactionId: number, responseType: string ): Promise<iTransactionDTO | iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = await TransactionRepo.findOneById( transactionId );

        let transactionDTO: iTransactionDTO | iTransactionSummaryDTO;

        if ( responseType === RESPONSE_TYPE.SUMMARY ) transactionDTO = TransactionMapper.mapToSummaryDTO( transactionEntity );
        else transactionDTO = TransactionMapper.mapToDTO( transactionEntity );

        return Promise.resolve( transactionDTO );
    };

    async updateTransaction( transactionId: number, transactionObj: iTransactionDTO ): Promise<iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = TransactionMapper.mapToEntity( transactionObj );

        const updatedTransactionEntity: iTransactionEntity = ( await TransactionRepo.updateTransactionById( transactionEntity ,
            transactionId ) );

        if ( transactionObj.isPaymentStatusChanged && transactionObj.status === TRXN_STATUS.COMPLETED || transactionObj.status === "FAILED" ) {
            this.eventEmitter.emit( EVENTS_NAMES.TRXN_STATUS_CHANGE, transactionObj );
        }
        
        return TransactionMapper.mapToSummaryDTO( updatedTransactionEntity );
    };

    async deleteTransaction( transactionId: number ): Promise<iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = await TransactionRepo.deleteTransactionById( transactionId );

        return Promise.resolve( TransactionMapper.mapToSummaryDTO( transactionEntity ) );
    };
};

export default ( new TransactionController() );