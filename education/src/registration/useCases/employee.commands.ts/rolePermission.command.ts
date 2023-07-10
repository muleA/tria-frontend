// /* eslint-disable prettier/prettier */
// import { ApiProperty } from '@nestjs/swagger';
// import { IsUUID, IsNotEmpty } from 'class-validator';
// import { EmployeeRoleEntity } from 'src/registration/persistence/Employee/employee-role.entity';
// import { EmployeeRole } from 'src/registration/domain/employee/employee-role';
// import { Common } from '../common';

// export class CreateRolePermissionCommand extends Common {
//   @ApiProperty()
//   id: string;
//   @ApiProperty()
//   roleId: string;
//   @ApiProperty()
//   permissionId: string;

  
//   static fromEntity(employeeRoleEntity: EmployeeRoleEntity): EmployeeRoleResponse {
//     const employeeRoleResponse: EmployeeRoleResponse = new EmployeeRoleResponse();

//     employeeRoleResponse.id = employeeRoleEntity?.id;
//     employeeRoleResponse.isActive = employeeRoleEntity?.isActive;
//     employeeRoleResponse.roleName = employeeRoleEntity?.roleName;
//     employeeRoleResponse.roleId = employeeRoleEntity?.roleId;
//     employeeRoleResponse.employeeId = employeeRoleEntity.employeeId;

//     employeeRoleResponse.createdAt = employeeRoleEntity?.createdAt
//     employeeRoleResponse.createdBy = employeeRoleEntity?.createdBy
//     employeeRoleResponse.updatedAt = employeeRoleEntity?.updatedAt
//     employeeRoleResponse.updatedBy = employeeRoleEntity?.updatedBy
//     employeeRoleResponse.deletedAt = employeeRoleEntity?.deletedAt
//     employeeRoleResponse.deletedBy = employeeRoleEntity?.deletedBy
//     return employeeRoleResponse;
//   }
//   static fromDomain(employeeRole: EmployeeRole): EmployeeRoleResponse {
//     const employeeRoleResponse: EmployeeRoleResponse = new EmployeeRoleResponse();
//     employeeRoleResponse.id = employeeRole.id;
//     employeeRoleResponse.isActive = employeeRole.isActive;
//     employeeRoleResponse.roleName = employeeRole.roleName;
//     employeeRoleResponse.roleId = employeeRole.roleId;
//     employeeRoleResponse.employeeId = employeeRole.employeeId;

//     employeeRoleResponse.createdAt = employeeRole.createdAt
//     employeeRoleResponse.createdBy = employeeRole.createdBy
//     employeeRoleResponse.updatedAt = employeeRole.updatedAt
//     employeeRoleResponse.updatedBy = employeeRole.updatedBy
//     employeeRoleResponse.deletedAt = employeeRole.deletedAt
//     employeeRoleResponse.deletedBy = employeeRole.deletedBy
//     return employeeRoleResponse;
//   }
// }
