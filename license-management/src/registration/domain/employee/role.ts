/* eslint-disable prettier/prettier */

import { Common } from "../common";
import { EmployeeRole } from "./employee-role";
import { RolePermission } from "./rolePermission";



export class Role extends Common {
  id: string;
  name: string;
  description: string;
  key: string;
  isDefault: boolean;
  employeeRole: EmployeeRole[];
  rolePermission: RolePermission[];
  }