import express from "express";

// import authenticator from "../Authenticator";
import UserControler from "./Controlers";
import UserValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.post( "/register", ( req, res ) => {
    
    if ( !UserValidators.onRegistration( req.body ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Mandatory fields are missing!!"
        });
    }

    UserControler.registerUser( req.body )
    .then( registeredUser => HttpHelper.sendResponse( res, 201, registeredUser, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ) );

});

router.get( "/all", ( req, res ) => {

    UserControler.getAllUsers()
    .then( users => HttpHelper.sendResponse( res, 201, users, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.get( "/byid/:id", ( req, res ) => {

    if ( !UserValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid user Id!!"
        });
    }

    UserControler.getUserById( req.params.id as unknown as number )
    .then( user => HttpHelper.sendResponse( res, 201, user, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.put( "/byid/:id", ( req, res ) => {

    if ( !UserValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid user Id!!"
        });
    }

    const isAdminUser = UserValidators.validateAdminUser( req );
    const isUserObjOwner = UserValidators.validateUserObjOwner( req );

    if ( !isAdminUser && !isUserObjOwner ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }

    UserControler.updateUser( req.params.id as unknown as number, req.body )
    .then( user => HttpHelper.sendResponse( res, 201, user, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

router.delete( "/byid/:id", ( req, res ) => {

    if ( !UserValidators.validateId( req.params.id as unknown as number ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Invalid user Id!!"
        });
    }

    const isAdminUser = UserValidators.validateAdminUser( req );
    const isUserObjOwner = UserValidators.validateUserObjOwner( req );

    if ( !isAdminUser && !isUserObjOwner ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "UnAuthorised action!!"
        });
    }
    
    UserControler.deleteUser( req.params.id as unknown as number )
    .then( user => HttpHelper.sendResponse( res, 200, user, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;