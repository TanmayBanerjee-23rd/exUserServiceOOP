import express from "express";

// import authenticator from "../Authenticator";
import TransactionControler from "./Controlers";
import TransactionValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/makepayment", ( req: any, res ) => {
    
    if ( !TransactionValidators.onTransactionCreation( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    TransactionControler.createTransaction( req.body, req.tokenData.id )
    .then( newTransaction => HttpHelper.sendResponse( res, 201, newTransaction, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req: any, res ) => {

    const isAdminUser = TransactionValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Unauthorised action!!"
        });
    }

    TransactionControler.getAllTransactions( req.tokenData.userType, req.tokenData.id )
    .then( transactions => HttpHelper.sendResponse( res, 201, transactions, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/single/:id", ( req: any, res ) => {

    if ( !TransactionValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid transaction Id!!"
        });
    }

    TransactionControler.getTransactionById( req.params.id as unknown as number, req.query.responseType as string )
    .then( transaction => {

        if ( Object.keys( transaction ).length ){

            if ( req.tokenData.userType === "normalUser" && transaction.userId !== req.tokenData.id ) {
                return HttpHelper.sendAcknowledgement( res, 500, { message: "User not authorised to access the resource!" } );
            }
        }

        HttpHelper.sendResponse( res, 201, transaction, null );
    })
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/update/:id", async ( req, res ) => {

    if ( !TransactionValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid transaction Id!!"
        });
    }

    const isAdminUser = TransactionValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Unauthorised action!!"
        });
    }

    req.body.isPaymentStatusChanged = false;

    if ( req.body.status ) {
        const existingTransaction: any = await TransactionControler.getTransactionById( req.body.id, "detailed" );

        if ( ( existingTransaction.status !== req.body.status ) ) {

            req.body.isPaymentStatusChanged = true;
        }
    }

    TransactionControler.updateTransaction( req.params.id as unknown as number, req.body )
    .then( transaction => HttpHelper.sendResponse( res, 201, transaction, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;