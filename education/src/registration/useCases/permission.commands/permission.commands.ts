/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
import { Role } from 'src/registration/domain/employee/role';
import { RolePermissionEntity } from 'src/registration/persistence/roles/role-permission.entity';
import { Permission } from 'src/registration/domain/permission/permission';
export class CreatePermissionCommand {

  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  key: string;
  @ApiProperty()
  isActive: boolean;
  // @ApiProperty()
  rolePermissions: RolePermissionEntity[];

  @ApiProperty()
  createAt: Date
  // @ApiProperty()
  createdBy: string
  // @ApiProperty()
  UpdatedAt: Date
  // @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string

  static fromCommands(createPermissionCommand: CreatePermissionCommand): Permission {
    const permission: Permission = new Permission();
    permission.id = createPermissionCommand?.id;
    permission.name = createPermissionCommand.name;
    permission.isActive = createPermissionCommand.isActive;
    permission.key = createPermissionCommand.key;
    permission.description = createPermissionCommand.key;
    // permission.rolePermissions = createPermissionCommand.rolePermissions;
    // permission.employeepermission = createPermissionCommand.permissionId;
    

    permission.createdAt=createPermissionCommand.createAt
    permission.createdBy=createPermissionCommand.createdBy
    permission.updatedAt=createPermissionCommand.UpdatedAt
    permission.updatedBy=createPermissionCommand.updatedBy
    permission.deletedAt=createPermissionCommand.deletedAt
    permission.deletedBy=createPermissionCommand.deletedBy

    return permission;
  }
}
export class UpdatePermissionCommand {
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
  // @ApiProperty()
  rolePermissions: RolePermissionEntity[];

  @ApiProperty()
  createAt: Date
  // @ApiProperty()
  createdBy: string
  // @ApiProperty()
  UpdatedAt: Date
  // @ApiProperty()
  updatedBy: string
  // @ApiProperty()
  deletedAt: Date
  // @ApiProperty()
  deletedBy: string

  static fromCommands(updateRoleCommand: UpdatePermissionCommand): Permission {
    const permission: Permission = new Permission();
    permission.id = updateRoleCommand?.id;
    permission.name = updateRoleCommand.name;
    permission.isActive = updateRoleCommand.isActive;
    permission.key = updateRoleCommand.key;
    permission.description = updateRoleCommand.key;
    // permission.rolePermissions = updateRoleCommand.rolePermissions;
    // permission.employeepermission = updateRoleCommand.permissionId;
    

    permission.createdAt=updateRoleCommand.createAt
    permission.createdBy=updateRoleCommand.createdBy
    permission.updatedAt=updateRoleCommand.UpdatedAt
    permission.updatedBy=updateRoleCommand.updatedBy
    permission.deletedAt=updateRoleCommand.deletedAt
    permission.deletedBy=updateRoleCommand.deletedBy

    return permission;
  }
}

