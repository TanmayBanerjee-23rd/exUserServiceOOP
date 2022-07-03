import { USER_TYPE } from "../ENUMS/User";

export interface iUserDTO {
    id?: number,
    firstName?: string,
    middleName?: string,
    lastName?: string,
    email: string,
    password: string,
    phoneNumber: number,
    userType: USER_TYPE
};