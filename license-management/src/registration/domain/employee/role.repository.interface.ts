/* eslint-disable prettier/prettier */
import { Role } from "./role";

export interface IRoleRepository {
    insertRole(role: Role): Promise<Role>;
    findAll(): Promise<Role[]>;
    findById(id: string): Promise<Role>;
    updateRole(role: Role): Promise<Role>;
    deleteById(id: string): Promise<boolean>;
    softDeleteRole(roleID: string): Promise<boolean>;
    restoreRole(roleID: string): Promise<boolean>;
}