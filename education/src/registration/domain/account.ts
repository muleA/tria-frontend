/* eslint-disable prettier/prettier */

import { User } from "./user";

export class UserAcount {
    id:string
    userName: string;
    password: string;
    email: string;
    status: string;
    accountType: string;

    user:User

    createdAt:Date
    createdBy:string
    updatedAt:Date
    updatedBy:string
    deletedAt:Date
    deletedBy:string
}