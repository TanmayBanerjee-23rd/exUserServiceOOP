import UserRepo from "../db/repositories/UserRepo";
import UserMapper from "./Mappers";
import { iUserEntity } from "../db/entities/User";
import { iUserDTO } from "../utilities/DTO/User";

class UserController {

    async registerUser( userObj: iUserDTO ): Promise<iUserDTO> {

        const existingUserEntity: iUserDTO = ( await this.getUserByEmail( userObj.email ) );

        if ( existingUserEntity && Object.keys( existingUserEntity ).length ) {
            
            throw new Error( "User already exists!" );
        };

        const userEntity: iUserEntity = UserMapper.mapToEntity( userObj );

        return Promise.resolve( UserMapper.mapToDTO( await UserRepo.create( userEntity ) ) );
    };

    async getAllUsers(): Promise<iUserDTO[]> {

        return Promise.resolve( ( await UserRepo.getAllUsers() )
                .map( ( userEntity: iUserEntity ) => UserMapper.mapToDTO( userEntity ) ) );
    };

    async getUserById( userId: number ): Promise<iUserDTO> {

        return Promise.resolve( UserMapper.mapToDTO( await UserRepo.findOneById( userId ) ) );
    };

    async getUserByEmail( userEmail: string ): Promise<iUserDTO> {

        return Promise.resolve( UserMapper.mapToDTO( await UserRepo.getUserByEmail( userEmail ) ) );
    };

    async updateUser( userId: number, userObj: iUserDTO ) {

        const userEntity: iUserEntity = UserMapper.mapToEntity( userObj );

        return Promise.resolve( UserMapper.mapToDTO( await UserRepo.updateUserById( userEntity ,
            userId ) ) );
    };

    async deleteUser( userId: number ): Promise<iUserDTO> {

        return Promise.resolve( UserMapper.mapToDTO( await UserRepo.deleteUserById( userId ) ) );
    };
};

export default ( new UserController() );