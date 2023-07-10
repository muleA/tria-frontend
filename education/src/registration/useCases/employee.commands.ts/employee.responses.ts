/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

import { EmployeeRoleEntity } from 'src/registration/persistence/Employee/employee-role.entity';
import { EmployeeEntity } from 'src/registration/persistence/Employee/employee.entity';
import { Employee } from 'src/registration/domain/employee/employee';
import { EmployeeRoleResponse } from './employeeRole.response';
import { Common } from '../common';
export class EmployeeResponse  extends Common{
    @ApiProperty()
    id: string;
    @ApiProperty()
    accountId: string;
    @ApiProperty()
    firstName: string;
    @ApiProperty()
    lastName: string;
    @ApiProperty()
    middleName: string;
    @ApiProperty()
    gender: string;
    @ApiProperty()
    subCity: string;
    @ApiProperty()
    city: string;
    @ApiProperty()
    wereda: string;
    @ApiProperty()
    kebele: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    houseNumber: string;
    @ApiProperty()
    employeeRole: EmployeeRoleResponse[];

    static fromEntity(employeeEntity: EmployeeEntity): EmployeeResponse {
        const employeeResponse = new EmployeeResponse();
        employeeResponse.id = employeeEntity.id;
        employeeResponse.accountId = employeeEntity.accountId;
        employeeResponse.firstName = employeeEntity.firstName;
        employeeResponse.firstName = employeeEntity.firstName;
        employeeResponse.lastName = employeeEntity.lastName;
        employeeResponse.gender = employeeEntity.gender;
        employeeResponse.wereda = employeeEntity.wereda;
        employeeResponse.kebele = employeeEntity.kebele;
        employeeResponse.city = employeeEntity.city;
        employeeResponse.phone = employeeEntity.phone;
        employeeResponse.subCity = employeeEntity.subCity;
        employeeResponse.houseNumber = employeeEntity.houseNumber;
        employeeResponse.email = employeeEntity.email;
        employeeResponse.status = employeeEntity.status;
        employeeResponse.employeeRole =employeeEntity?.employeeRole?.map((item) =>
        EmployeeRoleResponse.fromEntity(item))
        


        employeeResponse.createdAt = employeeEntity.createdAt
        employeeResponse.createdBy = employeeEntity.createdBy
        employeeResponse.updatedAt = employeeEntity.updatedAt
        employeeResponse.updatedBy = employeeEntity.updatedBy
        employeeResponse.deletedAt = employeeEntity.deletedAt
        employeeResponse.deletedBy = employeeEntity.deletedBy
        return employeeResponse;
    }
    static fromDomain(employee: Employee): EmployeeResponse {
        const employeeResponse = new EmployeeResponse();
        employeeResponse.id = employee.id;
        employeeResponse.accountId = employee.accountId;
        employeeResponse.firstName = employee.firstName;
        employeeResponse.firstName = employee.firstName;
        employeeResponse.lastName = employee.lastName;
        employeeResponse.gender = employee.gender;
        employeeResponse.wereda = employee.wereda;
        employeeResponse.kebele = employee.kebele;
        employeeResponse.city = employee.city;
        employeeResponse.phone = employee.phone;
        employeeResponse.subCity = employee.subCity;
        employeeResponse.houseNumber = employee.houseNumber;
        employeeResponse.email = employee.email;
        employeeResponse.status = employee.status;
        employeeResponse.employeeRole = employee.employeeRole?.map((item) =>
        EmployeeRoleResponse.fromDomain(item)
        )
       
        employeeResponse.createdAt = employee.createdAt
        employeeResponse.createdBy = employee.createdBy
        employeeResponse.updatedAt = employee.updatedAt
        employeeResponse.updatedBy = employee.updatedBy
        employeeResponse.deletedAt = employee.deletedAt
        employeeResponse.deletedBy = employee.deletedBy
        return employeeResponse;
    }
}