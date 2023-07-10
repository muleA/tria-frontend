/* eslint-disable prettier/prettier */

import { Common } from "../common";
import { Permission } from "../permission/permission";
import { EmployeeRole } from "./employee-role";
import { Role } from "./role";



export class RolePermission extends Common {
  id: string;
  roleId: string;
  permissionId: string;
  permissionName: string;
  role: Role
  permission: Permission;
  }