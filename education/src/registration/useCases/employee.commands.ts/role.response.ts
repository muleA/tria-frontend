/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRoleEntity } from 'src/registration/persistence/Employee/employee-role.entity';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
import { Common } from '../common';
import { RoleEntity } from 'src/registration/persistence/roles/role.entity';
import { EmployeeRoleResponse } from './employeeRole.response';
import { Role } from 'src/registration/domain/employee/role';
import { RolePermissionResponse } from './rolePermission.response';

export class RoleResponse extends Common {
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
  @ApiProperty()
  employeeRole: EmployeeRoleResponse[];
  rolePermission: RolePermissionResponse[];
  
  static fromEntity(roleEntity: RoleEntity): RoleResponse {
    const roleResponse: RoleResponse = new RoleResponse();

    roleResponse.id = roleEntity.id;
    roleResponse.name = roleEntity.name;
    roleResponse.key = roleEntity.key;
    roleResponse.description = roleEntity.description;
    roleResponse.isDefault = roleEntity.isDefault;
    roleResponse.employeeRole = roleEntity?.employeeRole?.map((element)=>EmployeeRoleResponse.fromEntity(element));
    console.log('ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
    roleResponse.rolePermission = roleEntity.rolePermission!==null?roleEntity?.rolePermission?.map((element)=>RolePermissionResponse.fromEntity(element)):null;

    roleResponse.createdAt = roleEntity?.createdAt
    roleResponse.createdBy = roleEntity?.createdBy
    roleResponse.updatedAt = roleEntity?.updatedAt
    roleResponse.updatedBy = roleEntity?.updatedBy
    roleResponse.deletedAt = roleEntity?.deletedAt
    roleResponse.deletedBy = roleEntity?.deletedBy
    return roleResponse;
  }
  static fromDomain(role: Role): RoleResponse {
    const roleResponse: RoleResponse = new RoleResponse();

    roleResponse.id = role.id;
    roleResponse.name = role.name;
    roleResponse.key = role.key;
    roleResponse.description = role.description;
    roleResponse.isDefault = role.isDefault;
    roleResponse.employeeRole = role?.employeeRole?.map((element)=>EmployeeRoleResponse.fromDomain(element));
    roleResponse.rolePermission = role?.rolePermission?.map((element)=>RolePermissionResponse.fromDomain(element));

    roleResponse.createdAt = role?.createdAt
    roleResponse.createdBy = role?.createdBy
    roleResponse.updatedAt = role?.updatedAt
    roleResponse.updatedBy = role?.updatedBy
    roleResponse.deletedAt = role?.deletedAt
    roleResponse.deletedBy = role?.deletedBy
    return roleResponse;
  }
}
