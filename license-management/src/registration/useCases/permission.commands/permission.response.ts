/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRoleEntity } from 'src/registration/persistence/Employee/employee-role.entity';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
import { Common } from '../common';
import { RoleResponse } from '../employee.commands.ts/role.response';
import { PermissionEntity } from 'src/registration/persistence/Permission/permission.entity';
import { Permission } from 'src/registration/domain/permission/permission';
import { RolePermissionResponse } from '../employee.commands.ts/rolePermission.response';

export class PermissionResponse extends Common {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  isActive: boolean;
  @ApiProperty()
  rolePermissions: RolePermissionResponse[];

  static fromEntity(permissionEntity: PermissionEntity): PermissionResponse {
    const permissionResponse: PermissionResponse = new PermissionResponse();
    permissionResponse.id = permissionEntity?.id;
    permissionResponse.isActive = permissionEntity?.isActive;
    permissionResponse.key = permissionEntity?.key;
    permissionResponse.description = permissionEntity?.description;
    permissionResponse.name = permissionEntity.name;
    permissionResponse.rolePermissions = permissionEntity?.rolePermissions?.map((element)=>RolePermissionResponse.fromEntity(element));

    permissionResponse.createdAt = permissionEntity?.createdAt
    permissionResponse.createdBy = permissionEntity?.createdBy
    permissionResponse.updatedAt = permissionEntity?.updatedAt
    permissionResponse.updatedBy = permissionEntity?.updatedBy
    permissionResponse.deletedAt = permissionEntity?.deletedAt
    permissionResponse.deletedBy = permissionEntity?.deletedBy
    return permissionResponse;
  }
  static fromDomain(permission: Permission): PermissionResponse {
    const permissionResponse: PermissionResponse = new PermissionResponse();

    permissionResponse.id = permission?.id;
    permissionResponse.isActive = permission?.isActive;
    permissionResponse.key = permission?.key;
    permissionResponse.description = permission?.description;
    permissionResponse.name = permission.name;
    permissionResponse.rolePermissions = permission?.rolePermissions?.map((element)=>RolePermissionResponse.fromDomain(element));

    permissionResponse.createdAt = permission?.createdAt
    permissionResponse.createdBy = permission?.createdBy
    permissionResponse.updatedAt = permission?.updatedAt
    permissionResponse.updatedBy = permission?.updatedBy
    permissionResponse.deletedAt = permission?.deletedAt
    permissionResponse.deletedBy = permission?.deletedBy
    return permissionResponse;
  }
}
