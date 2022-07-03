import express from "express";

// import authenticator from "../Authenticator";
import CategoryControler from "./Controlers";
import CategoryValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/create", ( req, res ) => {
    
    if ( !CategoryValidators.onCategoryCreation( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    const isAdminUser = CategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    CategoryControler.createCategory( req.body )
    .then( newCategory => HttpHelper.sendResponse( res, 201, newCategory, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req, res ) => {

    CategoryControler.getAllCategories()
    .then( categories => HttpHelper.sendResponse( res, 201, categories, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/byid/:id", ( req, res ) => {

    if ( !CategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid category Id!!"
        });
    }

    CategoryControler.getCategoryById( req.params.id as unknown as number )
    .then( category => HttpHelper.sendResponse( res, 201, category, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/byid/:id", ( req, res ) => {

    if ( !CategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid category Id!!"
        });
    }

    const isAdminUser = CategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    CategoryControler.updateCategory( req.params.id as unknown as number, req.body )
    .then( category => HttpHelper.sendResponse( res, 201, category, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.delete( "/byid/:id", ( req, res ) => {

    if ( !CategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid category Id!!"
        });
    }

    const isAdminUser = CategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }
    
    CategoryControler.deleteCategory( req.params.id as unknown as number )
    .then( category => HttpHelper.sendResponse( res, 200, category, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;