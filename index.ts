import express, { urlencoded } from "express";

import UserRoutes from "./src/users/Routes";
import CategoryRoutes from "./src/Categories/Routes";
import SubCategoryRoutes from "./src/SubCategories/Routes";
import ProductRoutes from "./src/products/Routes";
import SearchRoutes from "./src/search/Routes";

import MySqlInstance from "./src/db/MySql";

import EventsRegistrar from "./src/utilities/Events/Registrar";
import HttpHelper from "./src/utilities/Helpers/httpResponse";

const app = express();

app.use( urlencoded({ extended: true }) );

app.use( "/user/users", UserRoutes );
app.use( "/user/categories", CategoryRoutes );
app.use( "/user/subcategories", SubCategoryRoutes );
app.use( "/user/products", ProductRoutes );
app.use( "/user/search", SearchRoutes );

function errorHandler( err, req, res, next ) {

    if ( res.headersSent ) {
        return next( err );
    }

    console.log( `error  :: --> Server errorHandler Function : ${ err.message }` );
    HttpHelper.sendAcknowledgement( res, 500, err );
};

app.use( errorHandler );

MySqlInstance.initialiseMySql();

EventsRegistrar.register();

const server = app.listen( process.env.PORT || 6000 );

console.log( "User service is listening at port 6000!" );

export default server;