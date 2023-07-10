/* eslint-disable prettier/prettier */
import { User } from "../user";

export interface IUserRepository {
    insertUser(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    findById(id: string): Promise<User>;
    updateUser(user: User): Promise<User>;
    deleteById(id: string): Promise<boolean>;
    softDeleteUser(userID: string): Promise<boolean>;
    restoreUser(userID: string): Promise<boolean>;
    // archiveUser(user: User):Promise<User>;
}