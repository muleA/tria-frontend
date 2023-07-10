/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
import { RoleResponse } from './role.response';
import { Role } from 'src/registration/domain/employee/role';
import { RolePermission } from 'src/registration/domain/employee/rolePermission';
import { RolePermissionEntity } from 'src/registration/persistence/roles/role-permission.entity';
export class CreateRoleCommand {
//   @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  key: string;
  @ApiProperty()
  @IsNotEmpty()
  isDefault: boolean;
//   @ApiProperty()
  employeeRole: EmployeeRole[];



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

  static fromCommands(createRoleCommand: CreateRoleCommand): Role {
    const role: Role = new Role();
    role.id = createRoleCommand?.id;
    role.name = createRoleCommand.name;
    role.description = createRoleCommand.description;
    role.isDefault = createRoleCommand.isDefault;
    role.key = createRoleCommand.key;
    // role.employeeRole = createRoleCommand.roleId;
    

    role.createdAt=createRoleCommand.createAt
    role.createdBy=createRoleCommand.createdBy
    role.updatedAt=createRoleCommand.UpdatedAt
    role.updatedBy=createRoleCommand.updatedBy
    role.deletedAt=createRoleCommand.deletedAt
    role.deletedBy=createRoleCommand.deletedBy

    return role;
  }
}
export class UpdateRoleCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  name: string;
  @ApiProperty()
  @IsNotEmpty()
  description: string;
  @ApiProperty()
  @IsNotEmpty()
  key: string;
  @ApiProperty()
  @IsNotEmpty()
  isDefault: boolean;
//   @ApiProperty()
  employeeRole: EmployeeRole[];



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

  static fromCommands(updateRoleCommand: UpdateRoleCommand): Role {
    const role: Role = new Role();
    role.id = updateRoleCommand?.id;
    role.name = updateRoleCommand.name;
    role.description = updateRoleCommand.description;
    role.isDefault = updateRoleCommand.isDefault;
    role.key = updateRoleCommand.key;
    // role.employeeRole = updateRoleCommand.roleId;
    

    role.createdAt=updateRoleCommand.createAt
    role.createdBy=updateRoleCommand.createdBy
    role.updatedAt=updateRoleCommand.UpdatedAt
    role.updatedBy=updateRoleCommand.updatedBy
    role.deletedAt=updateRoleCommand.deletedAt
    role.deletedBy=updateRoleCommand.deletedBy

    return role;
  }
}
export class AssignEmployeeToRoleCommand {
  @ApiProperty()
  roleName:string
  @ApiProperty()
  roleId:string
}
export class PermissionToAssign {
  permissionId: string;
  permissionName: string;
}
export class CreateRolePermissionCommand {
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roleId: string;
  permissionId: string;
  permissionName: string;

  @ApiProperty()
  permissions: PermissionToAssign[];
  /**
  /**
   *A method that mapes  CreateRolePermissionCommand object data to  RolePermission domain object
   *@returns RolePermission domain object which contains RolePermission  information
   */
  static fromCommands(
    rolePermissionCommand: CreateRolePermissionCommand
  ): RolePermission{
    const rolePermission: RolePermission = new RolePermission();

    rolePermission.roleId = rolePermissionCommand.roleId;
    rolePermission.permissionId = rolePermissionCommand.permissionId;
    rolePermission.permissionName = rolePermissionCommand.permissionName;
    rolePermission.roleId = rolePermissionCommand.roleId;
    return rolePermission;
  }
}
