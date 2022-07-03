import express from "express";

// import authenticator from "../Authenticator";
import ProductControler from "./Controlers";
import ProductValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/create", ( req, res ) => {
    
    if ( !ProductValidators.onProductCreation( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    const isAdminUser = ProductValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    ProductControler.createProduct( req.body )
    .then( newProduct => HttpHelper.sendResponse( res, 201, newProduct, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req, res ) => {

    ProductControler.getAllProducts()
    .then( products => HttpHelper.sendResponse( res, 201, products, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/byid/:id", ( req, res ) => {

    if ( !ProductValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid product Id!!"
        });
    }

    ProductControler.getProductById( req.params.id as unknown as number, req.query.responseType as string )
    .then( product => HttpHelper.sendResponse( res, 201, product, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/byid/:id", ( req, res ) => {

    if ( !ProductValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid product Id!!"
        });
    }

    const isAdminUser = ProductValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    ProductControler.updateProduct( req.params.id as unknown as number, req.body )
    .then( product => HttpHelper.sendResponse( res, 201, product, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.delete( "/byid/:id", ( req, res ) => {

    if ( !ProductValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid product Id!!"
        });
    }

    const isAdminUser = ProductValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }
    
    ProductControler.deleteProduct( req.params.id as unknown as number )
    .then( product => HttpHelper.sendResponse( res, 200, product, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;