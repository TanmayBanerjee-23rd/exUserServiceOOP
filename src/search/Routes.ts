import express from "express";

// import authenticator from "../Authenticator";
import SearchControler from "./Controlers";
import SearchValidators from "./validators";
import HttpHelper from "../utilities/Helpers/httpResponse";

const router = express.Router();

router.use( express.json( { type: "application/json" } ) );

router.get( "/product", ( req, res ) => {

    if ( !SearchValidators.queryObjHasProperties( req.query ) ) {
        return HttpHelper.sendAcknowledgement( res, 400, {
            message: "Search parameters missing!!"
        });
    }

    SearchControler.getProducts( req.query )
    .then( products => HttpHelper.sendResponse( res, 201, products, null ))
    .catch( err => HttpHelper.sendAcknowledgement( res, 500, err ));
});

export default router;