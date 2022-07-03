import { iUserEntity } from "../db/entities/User";
import { iUserDTO } from "../utilities/DTO/User";

class UserMapper {

    mapToEntity( userObj: iUserDTO ): iUserEntity {

        return {
            email: userObj.email ? userObj.email : null,
            password: userObj.password ? userObj.password : null,
            phoneNumber: userObj.phoneNumber ? userObj.phoneNumber : null,
            userType: userObj.userType ? userObj.userType : null,
            firstName: userObj.firstName ? userObj.firstName : null,
            middleName: userObj.middleName ? userObj.middleName : null,
            lastName: userObj.lastName ? userObj.lastName : null
        };
    };

    mapToDTO( userObj: iUserEntity ): iUserDTO {

        return {
            id: userObj.id,
            email: userObj.email,
            password: userObj.password,
            phoneNumber: userObj.phoneNumber,
            userType: userObj.userType,
            firstName: userObj.firstName,
            middleName: userObj.middleName,
            lastName: userObj.lastName
        };
    };
};

export default ( new UserMapper() );