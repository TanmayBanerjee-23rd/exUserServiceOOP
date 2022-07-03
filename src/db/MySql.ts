'use strict';

import { Sequelize, QueryTypes } from 'sequelize';
import config from './config/config';

import Users from './models/Users';

import Categories from './models/Categories';
import SubCategories from './models/SubCategories';
import Products from './models/Products';
import Orders from './models/Orders';
import Transactions from './models/Transactions';

const env = process.env.NODE_ENV || 'development';

class Mysql {

  sequelize: Sequelize | undefined = undefined;

  private createDbInstance() {

    this.sequelize = new Sequelize( config[ env ].DB_URI ) ;

  };

  getMysqlInstance(){

    if ( !this.sequelize ){
      this.createDbInstance();
    }

    return {
      sequelize: this.sequelize,
      QueryTypes
    };
  };

  async initialiseMySql() {

    if ( !this.sequelize ){
      this.createDbInstance();
    }

    try {
      await this.sequelize.authenticate();
      console.log( "Database connection has been established successfully." );
    } catch ( error ) {
      console.error( "Unable to connect to the database:", error );
    }

    Users.intializeUsersModel( this.sequelize );

    Categories.intializeCategoryModel( this.sequelize );
    SubCategories.intializeSubCategoryModel( this.sequelize );
    Products.intializeProductsModel( this.sequelize );
    Orders.intializeOrderModel( this.sequelize );
    Transactions.intializeTransactionModel( this.sequelize );

    await this.sequelize.sync();
  };

};

export default ( new Mysql() );
