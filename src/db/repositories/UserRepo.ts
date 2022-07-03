import PaginateRepo from './paginateRepo';
import Users from "../models/Users";
import { iUserEntity } from "../entities/User";


class UserRepo extends PaginateRepo<iUserEntity> {

    protected getModel() {
        return ( Users.getUserModelInstance() );
    };

    async getAllUsers() {
        return ( await this.findAll( {} ) );
    };

    async getUserByEmail( userEmail: string ) {
        return ( await this.conditionalFindOne({ email: userEmail }) );
    };

    async getUserByPhoneNumber( phoneNumber: string ) {
        return ( await this.conditionalFindOne({ phoneNumber: phoneNumber }) );
    };

    async updateUserById( userObj: iUserEntity, userId: number ) {
        return ( await this.updateOne( userObj, { where: { id: userId } }) );
    };

    async deleteUserById( userId: number ) {
        return ( await this.deleteOne({ id: userId }) );
    };
};

export default ( new UserRepo() );
