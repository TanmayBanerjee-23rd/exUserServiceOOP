import { USER_TYPE } from "../../utilities/ENUMS/User";

export interface iUserEntity {
    id?: number,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email: string,
    password: string,
    phoneNumber: number,
    userType: USER_TYPE
};