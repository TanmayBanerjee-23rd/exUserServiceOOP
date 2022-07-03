import BaseRepo from "./baseRepo";
import MySql from "../MySql";

abstract class PaginateRepo<Entity> extends BaseRepo<Entity>{

    dbInstance;

    constructor() {
        super();
        this.dbInstance = MySql.getMysqlInstance();
    };

    protected async findAllPageWise( conditionObj, skipCount, limitCount ) {
        return ( await this.getModel().find( conditionObj )
                        .skip( skipCount )
                        .limit( limitCount ) );
    };

    protected async query( queryStr ) {
        return ( await this.dbInstance.sequelize.query( queryStr, { type: this.dbInstance.QueryTypes.SELECT }) );
    };

};

export default PaginateRepo;