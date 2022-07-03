import { get } from "superagent";
import  config from "../config";
import jwt from "jsonwebtoken"

class Authenticator {

    authorize( req, res, next ) {
        get( "http://authService:7000/authorize" )
        .set( "Authorization", req.headers.authorization )
        .query( req.query )
        .end( ( err, response ) => {
            if ( err ) {
                return res.status( 500 ).json( { 
                    authenticated: false, 
                    authorized: null, 
                    message: err.message 
                } );
            }

            req.tokenData = response;

            next( null );
        })
    };

    verify( req, res, next ) {

        const token = this.extractTokenString( req.headers.authorization );
        try {
            const decoded = jwt.verify( token, config.jwtSecret );

            if ( decoded ) {
                req.tokenData = {
                    isValid: true,
                    decodedToken: decoded
                };

                return next( null );

            } else {

                res.status( 500 ).json({
                    isValid: false,
                    message: "Invalid JWT token!"
                });
            }

        } catch( err ) {

            res.status( 500 ).json({
                isValid: false,
                message: err.message
            });
        }
    };

    private extractTokenString( authorization ) {
        return authorization.split( ' ' )[ 1 ];
    };

};

export default ( new Authenticator() );