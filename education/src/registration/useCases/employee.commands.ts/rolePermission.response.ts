/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRoleEntity } from 'src/registration/persistence/Employee/employee-role.entity';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
import { Common } from '../common';
import { RoleEntity } from 'src/registration/persistence/roles/role.entity';
import { EmployeeRoleResponse } from './employeeRole.response';
import { Role } from 'src/registration/domain/employee/role';
import { PermissionResponse } from '../permission.commands/permission.response';
import { RolePermissionEntity } from 'src/registration/persistence/roles/role-permission.entity';
import { Permission } from 'src/registration/domain/permission/permission';
import { RolePermission } from 'src/registration/domain/employee/rolePermission';
import { RoleResponse } from './role.response';

export class RolePermissionResponse extends Common {
  @ApiProperty()
  id: string;
  @ApiProperty()
  roleId: string;
  @ApiProperty()
  role: RoleResponse;
  @ApiProperty()
  permissionId: string;
  @ApiProperty()
  permissionName: string;
  @ApiProperty()
  permission: PermissionResponse;
  
  static fromEntity(rolePermissionEntity: RolePermissionEntity): RolePermissionResponse {
    const rolePermissionResponse: RolePermissionResponse = new RolePermissionResponse();

    rolePermissionResponse.id = rolePermissionEntity?.id
    rolePermissionResponse.roleId = rolePermissionEntity?.roleId;
    rolePermissionResponse.permissionId = rolePermissionEntity?.permissionId;
    rolePermissionResponse.permissionName = rolePermissionEntity?.permissionName;
    // rolePermissionResponse.role = RoleResponse.fromEntity(rolePermissionEntity.role);
    // rolePermissionResponse.permission = PermissionResponse.fromEntity(rolePermissionEntity.permission);

    rolePermissionResponse.createdAt = rolePermissionEntity.createdAt
    rolePermissionResponse.createdBy = rolePermissionEntity?.createdBy
    rolePermissionResponse.updatedAt = rolePermissionEntity?.updatedAt
    rolePermissionResponse.updatedBy = rolePermissionEntity?.updatedBy
    rolePermissionResponse.deletedAt = rolePermissionEntity?.deletedAt
    rolePermissionResponse.deletedBy = rolePermissionEntity?.deletedBy
    return rolePermissionResponse;
  }
  static fromDomain(rolePermission: RolePermission): RolePermissionResponse {
    const rolePermissionResponse: RolePermissionResponse = new RolePermissionResponse();

    rolePermissionResponse.id = rolePermission.id
    rolePermissionResponse.roleId = rolePermission.roleId;
    rolePermissionResponse.permissionId = rolePermission.permissionId;
    rolePermissionResponse.role = rolePermission.role;
    rolePermissionResponse.permission = rolePermission.permission;

    rolePermissionResponse.createdAt = rolePermission?.createdAt
    rolePermissionResponse.createdBy = rolePermission?.createdBy
    rolePermissionResponse.updatedAt = rolePermission?.updatedAt
    rolePermissionResponse.updatedBy = rolePermission?.updatedBy
    rolePermissionResponse.deletedAt = rolePermission?.deletedAt
    rolePermissionResponse.deletedBy = rolePermission?.deletedBy
    return rolePermissionResponse;
  }
}
