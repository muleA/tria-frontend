
import { Permission } from "./permission";

export interface IPermissionRepository {
    insertPermission(permission: Permission): Promise<Permission>;
    findAll(): Promise<Permission[]>;
    findById(id: string): Promise<Permission>;
    updatePermission(permission: Permission): Promise<Permission>;
    deleteById(id: string): Promise<boolean>;
    softDeletePermission(permissionID: string): Promise<boolean>;
    restorePermission(permissionID: string): Promise<boolean>;
}