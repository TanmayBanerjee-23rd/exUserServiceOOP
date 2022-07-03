import express from "express";

// import authenticator from "../Authenticator";
import SubCategoryControler from "./Controlers";
import SubCategoryValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/create", ( req, res ) => {
    
    if ( !SubCategoryValidators.onSubCategoryCreation( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    const isAdminUser = SubCategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    SubCategoryControler.createSubCategory( req.body )
    .then( newSubCategory => HttpHelper.sendResponse( res, 201, newSubCategory, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req, res ) => {

    SubCategoryControler.getAllSubCategories()
    .then( products => HttpHelper.sendResponse( res, 201, products, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/byid/:id", ( req, res ) => {

    if ( !SubCategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid subCategory Id!!"
        });
    }

    SubCategoryControler.getSubCategoryById( req.params.id as unknown as number )
    .then( subCategory => HttpHelper.sendResponse( res, 201, subCategory, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/byid/:id", ( req, res ) => {

    if ( !SubCategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid subCategory Id!!"
        });
    }

    const isAdminUser = SubCategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    SubCategoryControler.updateSubCategory( req.params.id as unknown as number, req.body )
    .then( product => HttpHelper.sendResponse( res, 201, product, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.delete( "/byid/:id", ( req, res ) => {

    if ( !SubCategoryValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid subCategory Id!!"
        });
    }

    const isAdminUser = SubCategoryValidators.validateAdminUser( req );

    if ( !isAdminUser ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }
    
    SubCategoryControler.deleteSubCategory( req.params.id as unknown as number )
    .then( product => HttpHelper.sendResponse( res, 200, product, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;