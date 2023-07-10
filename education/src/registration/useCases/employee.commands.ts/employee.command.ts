/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsEnum } from 'class-validator';
import { Employee } from 'src/registration/domain/employee/employee';
import { CreateEmployeeRoleCommand } from './employeeRole.command';


enum GENDERTYPE {
    MALE = "Male",
    Female = "Female",
}
export class CreateEmployeeCommand {
    // @ApiProperty()
    // @IsUUID()
    // @IsNotEmpty()
    id: string
    @IsNotEmpty()
    @ApiProperty()
    @IsUUID()
    accountId: string
    @IsNotEmpty()
    @ApiProperty()
    firstName: string
    @IsNotEmpty()
    @ApiProperty()
    middleName: string
    @IsNotEmpty()
    @ApiProperty()
    lastName: string
    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(GENDERTYPE, {
        message: "CustomerType must be Male or Female",
    })
    gender: GENDERTYPE
    @IsNotEmpty()
    @ApiProperty()
    state: string
    @IsNotEmpty()
    @ApiProperty()

    city: string
    @IsNotEmpty()
    @ApiProperty()
    wereda: string
    @IsNotEmpty()
    @ApiProperty()
    kebele: string
    @IsNotEmpty()
    @ApiProperty()
    phone: string
    @ApiProperty()
    houseNumber: string
    @IsNotEmpty()
    @ApiProperty()
    subCity: string
    @IsNotEmpty()
    @ApiProperty()
    email: string
    // @IsNotEmpty()
    // @ApiProperty()
    status: string
    // @ApiProperty()
    employeeRole: CreateEmployeeRoleCommand[]
    

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

    static fromCommands(createEmployeeCommand: CreateEmployeeCommand): Employee {
        const employee: Employee = new Employee();
        employee.id = createEmployeeCommand.id;
        employee.accountId = createEmployeeCommand.accountId;
        employee.firstName = createEmployeeCommand.firstName;
        employee.middleName = createEmployeeCommand.middleName;
        employee.lastName = createEmployeeCommand.lastName;
        employee.gender = createEmployeeCommand.gender;
        employee.wereda = createEmployeeCommand.wereda;
        employee.kebele = createEmployeeCommand.kebele;
        employee.city = createEmployeeCommand.city;
        employee.phone = createEmployeeCommand.phone;
        employee.subCity = createEmployeeCommand.subCity;
        employee.houseNumber = createEmployeeCommand.houseNumber;
        employee.email = createEmployeeCommand.email;
        employee.status = createEmployeeCommand?.status;
        employee.employeeRole = createEmployeeCommand.employeeRole?.map((item) =>
            CreateEmployeeRoleCommand.fromCommands(item)
        )
        
        employee.createdBy = createEmployeeCommand.createdBy
        employee.updatedAt = createEmployeeCommand.UpdatedAt
        employee.updatedBy = createEmployeeCommand.updatedBy
        employee.deletedAt = createEmployeeCommand.deletedAt
        employee.deletedBy = createEmployeeCommand.deletedBy
        return employee;
    }
}
export class UpdateEmployeeCommand {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    id: string
    @IsNotEmpty()
    @ApiProperty()
    @IsUUID()
    accountId: string
    @IsNotEmpty()
    @ApiProperty()
    firstName: string
    @IsNotEmpty()
    @ApiProperty()
    middleName: string
    @IsNotEmpty()
    @ApiProperty()
    lastName: string
    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(GENDERTYPE, {
        message: "CustomerType must be Male or Female",
    })
    gender: GENDERTYPE
    @IsNotEmpty()
    @ApiProperty()
    state: string
    // @IsNotEmpty()
    // @ApiProperty()
     status    
     @IsNotEmpty()
    @ApiProperty()

    city: string
    @IsNotEmpty()
    @ApiProperty()
    wereda: string
    @IsNotEmpty()
    @ApiProperty()
    kebele: string
    @IsNotEmpty()
    @ApiProperty()
    phone: string
    @ApiProperty()
    houseNumber: string
    @IsNotEmpty()
    @ApiProperty()
    subCity: string
    @IsNotEmpty()
    @ApiProperty()
    email: string
    // @ApiProperty()
    employeeRole: CreateEmployeeRoleCommand[]
    

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
    static fromCommands(updateEmployeeRoleCommand: UpdateEmployeeCommand): Employee {
        const employee: Employee = new Employee();
        employee.id = updateEmployeeRoleCommand.id;
        employee.accountId = updateEmployeeRoleCommand.accountId;
        employee.firstName = updateEmployeeRoleCommand.firstName;
        employee.middleName = updateEmployeeRoleCommand.middleName;
        employee.lastName = updateEmployeeRoleCommand.lastName;
        employee.gender = updateEmployeeRoleCommand.gender;
        employee.wereda = updateEmployeeRoleCommand.wereda;
        employee.kebele = updateEmployeeRoleCommand.kebele;
        employee.city = updateEmployeeRoleCommand.city;
        employee.phone = updateEmployeeRoleCommand.phone;
        employee.subCity = updateEmployeeRoleCommand.subCity;
        employee.houseNumber = updateEmployeeRoleCommand.houseNumber;
        employee.email = updateEmployeeRoleCommand.email;
        employee.status = updateEmployeeRoleCommand?.status;
        employee.employeeRole = updateEmployeeRoleCommand.employeeRole?.map((item) =>
            CreateEmployeeRoleCommand.fromCommands(item)
        )
        
        employee.createdBy = updateEmployeeRoleCommand.createdBy
        employee.updatedAt = updateEmployeeRoleCommand.UpdatedAt
        employee.updatedBy = updateEmployeeRoleCommand.updatedBy
        employee.deletedAt = updateEmployeeRoleCommand.deletedAt
        employee.deletedBy = updateEmployeeRoleCommand.deletedBy
        return employee;
    }
}