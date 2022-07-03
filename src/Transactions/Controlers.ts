import TransactionRepo from "../db/repositories/TransactionRepo";
import TransactionMapper from "./Mappers";
import EventsInstancetiator from "../utilities/Events/Instancetiator";
import { iTransactionEntity } from "../db/entities/Transaction";
import { iTransactionDTO, iTransactionSummaryDTO, iMakePaymentDTO } from "../utilities/DTO/Transaction";


class TransactionController {

    eventEmitter;

    constructor() {
        this.eventEmitter = EventsInstancetiator.getEmitterInstance();
    };

    async createTransaction( transactionObj: iTransactionDTO ): Promise<iMakePaymentDTO> {

        const transactionEntity: iTransactionEntity = TransactionMapper.mapToEntity( transactionObj );

        const createdTransactionEntity = await TransactionRepo.create( transactionEntity ) ;

        return Promise.resolve( TransactionMapper.mapToTrxnPostPayDTO( createdTransactionEntity ) );
    };

    async getAllTransactions( userType: "admin" | "normalUser", userId: number ): Promise<iTransactionSummaryDTO[]> {

        const transactionEntities: iTransactionEntity[] = await TransactionRepo.getAllTransactions( userType, userId );

        const transactionDTOs: iTransactionSummaryDTO[] = transactionEntities.map( transactionEntity => TransactionMapper.mapToSummaryDTO( transactionEntity ) );

        return Promise.resolve( transactionDTOs );
    };

    async getTransactionById( transactionId: number, responseType: string ): Promise<iTransactionDTO | iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = await TransactionRepo.findOneById( transactionId );

        let transactionDTO: iTransactionDTO | iTransactionSummaryDTO;

        if ( responseType === "summary" ) transactionDTO = TransactionMapper.mapToSummaryDTO( transactionEntity );
        else transactionDTO = TransactionMapper.mapToDTO( transactionEntity );

        return Promise.resolve( transactionDTO );
    };

    async updateTransaction( transactionId: number, transactionObj: iTransactionDTO ): Promise<iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = TransactionMapper.mapToEntity( transactionObj );

        const updatedTransactionEntity: iTransactionEntity = ( await TransactionRepo.updateTransactionById( transactionEntity ,
            transactionId ) );

        if ( transactionObj.isPaymentStatusChanged ) {
            this.eventEmitter.emit( "transactionStatusChange", transactionObj );
        }
        
        return TransactionMapper.mapToSummaryDTO( updatedTransactionEntity );
    };

    async deleteTransaction( transactionId: number ): Promise<iTransactionSummaryDTO> {

        const transactionEntity: iTransactionEntity = await TransactionRepo.deleteTransactionById( transactionId );

        return Promise.resolve( TransactionMapper.mapToSummaryDTO( transactionEntity ) );
    };
};

export default ( new TransactionController() );