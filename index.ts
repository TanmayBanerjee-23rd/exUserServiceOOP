import express, { urlencoded } from "express";

import UserRoutes from "./src/users/Routes";
import CategoryRoutes from "./src/Categories/Routes";
import SubCategoryRoutes from "./src/SubCategories/Routes";
import ProductRoutes from "./src/products/Routes";
import SearchRoutes from "./src/search/Routes";

import MySqlInstance from "./src/db/MySql";

import EventsRegistrar from "./src/utilities/Events/Registrar";

const app = express();

app.use( urlencoded({ extended: true }) );

app.use( "/users", UserRoutes );
app.use( "/categories", CategoryRoutes );
app.use( "/subcategories", SubCategoryRoutes );
app.use( "/products", ProductRoutes );
app.use( "/search", SearchRoutes );

MySqlInstance.initialiseMySql();

EventsRegistrar.register();

const server = app.listen( process.env.PORT || 6000 );

console.log( "User service is listening at port 6000!" );

export default server;