import express from "express";

// import authenticator from "../Authenticator";
import OrderControler from "./Controlers";
import OrderValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/create", ( req: any, res ) => {
    
    if ( !OrderValidators.onOrderCreation( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    const isAdminUser = OrderValidators.validateAdminUser( req );

    if ( !isAdminUser  && req.tokenData.id !== req.body.buyerId ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Unauthorised action!!"
        });
    }

    OrderControler.createOrder( req.body )
    .then( newOrder => HttpHelper.sendResponse( res, 201, newOrder, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req: any, res ) => {

    OrderControler.getAllOrders( req.tokenData.userType, req.tokenData.id )
    .then( orders => HttpHelper.sendResponse( res, 201, orders, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/byid/:id", ( req: any, res ) => {

    if ( !OrderValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid order Id!!"
        });
    }

    OrderControler.getOrderById( req.params.id as unknown as number, req.query.responseType as string )
    .then( order => {

        if ( Object.keys( order ).length ){

            if ( req.tokenData.userType === "normalUser" && order.buyerId !== req.tokenData.id ) {
                return HttpHelper.sendAcknowledgement( res, 500, { message: "User not authorised to access the resource!" } );
            }
        }

        HttpHelper.sendResponse( res, 201, order, null );
    })
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/byid/:id", async ( req, res ) => {

    if ( !OrderValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid order Id!!"
        });
    }

    const isAdminUser = OrderValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Unauthorised action!!"
        });
    }

    req.body.isDeliveryStatusChanged = false;

    if ( req.body.deliveryStatus ) {
        const existingOrder: any = await OrderControler.getOrderById( req.body.orderId, "detailed" );

        if ( ( existingOrder.deliveryStatus === "packed" && req.body.deliveryStatus !== "shipped" ) &&
        ( existingOrder.deliveryStatus === "shipped" && req.body.deliveryStatus !== "outForDelivery" ) &&
        ( existingOrder.deliveryStatus === "outForDelivery" && req.body.deliveryStatus !== "delivered" ) ) {

            req.body.isDeliveryStatusChanged = true;
            return HttpHelper.sendAcknowledgement( res, 500, { message: "Forbidden delivery status change detected!" } );
        }
    }

    OrderControler.updateOrder( req.params.id as unknown as number, req.body )
    .then( order => HttpHelper.sendResponse( res, 201, order, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.delete( "/byid/:id", ( req, res ) => {

    if ( !OrderValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid order Id!!"
        });
    }

    const isAdminUser = OrderValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Unauthorised action!!"
        });
    }
    
    OrderControler.deleteOrder( req.params.id as unknown as number )
    .then( order => HttpHelper.sendResponse( res, 200, order, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;