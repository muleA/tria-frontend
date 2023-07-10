/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty } from 'class-validator';
import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
export class CreateEmployeeRoleCommand {
//   @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
  @ApiProperty()
  @IsNotEmpty()
  roleName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  roleId: string;


  @ApiProperty()
  createdAt: Date
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

  static fromCommands(createEmployeeRoleCommand: CreateEmployeeRoleCommand): EmployeeRole {
    const employeeRole: EmployeeRole = new EmployeeRole();
    employeeRole.id = createEmployeeRoleCommand?.id;
    employeeRole.isActive = createEmployeeRoleCommand.isActive;
    employeeRole.roleName = createEmployeeRoleCommand.roleName;
    employeeRole.employeeId = createEmployeeRoleCommand.employeeId;
    employeeRole.roleId = createEmployeeRoleCommand.roleId;
    

    employeeRole.createdAt=createEmployeeRoleCommand.createdAt
    employeeRole.createdBy=createEmployeeRoleCommand.createdBy
    employeeRole.updatedAt=createEmployeeRoleCommand.UpdatedAt
    employeeRole.updatedBy=createEmployeeRoleCommand.updatedBy
    employeeRole.deletedAt=createEmployeeRoleCommand.deletedAt
    employeeRole.deletedBy=createEmployeeRoleCommand.deletedBy

    return employeeRole;
  }
}
export class UpdateEmployeeRoleCommand {
  @ApiProperty()
  id: string;
  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  employeeId: string;
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roleName: string;
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roleId: string;



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

  static fromCommands(updateEmployeeRoleCommand: UpdateEmployeeRoleCommand): EmployeeRole {
    const employeeRole: EmployeeRole = new EmployeeRole();
    employeeRole.id = updateEmployeeRoleCommand?.id;
    employeeRole.isActive = updateEmployeeRoleCommand.isActive;
    employeeRole.roleName = updateEmployeeRoleCommand.roleName;
    employeeRole.employeeId = updateEmployeeRoleCommand.employeeId;
    employeeRole.roleId = updateEmployeeRoleCommand.roleId;
    

    employeeRole.createdAt=updateEmployeeRoleCommand.createAt
    employeeRole.createdBy=updateEmployeeRoleCommand.createdBy
    employeeRole.updatedAt=updateEmployeeRoleCommand.UpdatedAt
    employeeRole.updatedBy=updateEmployeeRoleCommand.updatedBy
    employeeRole.deletedAt=updateEmployeeRoleCommand.deletedAt
    employeeRole.deletedBy=updateEmployeeRoleCommand.deletedBy

    return employeeRole;
  }
}
export class AddRoleToEmployeeCommand {
  // @ApiProperty()
  id: string;
  // @ApiProperty()
  // @IsNotEmpty()
  isActive: boolean;
  // @ApiProperty()
  // @IsNotEmpty()
  // @IsUUID()
  employeeId: string;
  @ApiProperty()
  @IsNotEmpty()
  roleName: string;
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  roleId: string;



  @ApiProperty()
  createdAt: Date
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

  static fromCommands(updateEmployeeRoleCommand: UpdateEmployeeRoleCommand): EmployeeRole {
    const employeeRole: EmployeeRole = new EmployeeRole();
    employeeRole.id = updateEmployeeRoleCommand?.id;
    employeeRole.isActive = updateEmployeeRoleCommand.isActive;
    employeeRole.roleName = updateEmployeeRoleCommand.roleName;
    employeeRole.employeeId = updateEmployeeRoleCommand.employeeId;
    employeeRole.roleId = updateEmployeeRoleCommand.roleId;
    

    employeeRole.createdAt=updateEmployeeRoleCommand.createAt
    employeeRole.createdBy=updateEmployeeRoleCommand.createdBy
    employeeRole.updatedAt=updateEmployeeRoleCommand.UpdatedAt
    employeeRole.updatedBy=updateEmployeeRoleCommand.updatedBy
    employeeRole.deletedAt=updateEmployeeRoleCommand.deletedAt
    employeeRole.deletedBy=updateEmployeeRoleCommand.deletedBy

    return employeeRole;
  }
}
