class HttpResHelper {

    sendAcknowledgement( res, statusCode, err ) {

        let response: any = {
            success: true
        };

        if ( err ) {
            response.success = false;
            response.message = err.message;
        }

        res.status( statusCode ).send( response );
        
    };


    sendResponse( res, statusCode, data, err ) {

        let response: any = {
            success: true
        };

        if ( err ) {
            response.success = false;
            response.message = err.message;
        } else {
            response.data = data;
        }

        res.status( statusCode ).send( response );
    };
};

export default ( new HttpResHelper() );