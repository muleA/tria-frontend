import { RolePermissionEntity } from "src/registration/persistence/roles/role-permission.entity";
import { Common } from "../common";
import { RolePermission } from "../employee/rolePermission";

export class Permission extends Common {
    id: string;
    name: string;
    description: string;
    key: string;
    isActive: boolean;
    rolePermissions: RolePermission[];
    }