/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/auth/jwt.auth.guard';
import { Roles } from 'src/auth/auth/roles.decorator';
import { CreateEmployeeCommand, UpdateEmployeeCommand } from 'src/registration/useCases/employee.commands.ts/employee.command';
import { EmployeeResponse } from 'src/registration/useCases/employee.commands.ts/employee.responses';
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { EmployeeCommand } from 'src/registration/useCases/employee.commands.ts/employee.usecases.command';
import { AddRoleToEmployeeCommand } from 'src/registration/useCases/employee.commands.ts/employeeRole.command';

@Controller('employees')
@ApiTags('employees')
// @UseGuards(JwtAuthGuard)
export class EmployeesController {
    constructor(
        private commands: EmployeeCommand,
        private queries: EmployeeQueries
    ) { }

    // @UseGuards(JwtAuthGuard)
    @Get("get-Employees")
    @ApiOkResponse({ type: EmployeeResponse })
    async getEmployee() {
        return await this.queries.fecthEmployees()
    }

    // @UseGuards(JwtAuthGuard)
    @Post("create-employee")
    @ApiOkResponse({ type: EmployeeResponse })
    async createEmployee(
        @Body() createEmployeeCommand: CreateEmployeeCommand
    ) {
        console.log(createEmployeeCommand)
        return await this.commands.createEmployee(createEmployeeCommand);
    }

    @Get("get-employee/:employeeId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getEmployeeId(@Param('employeeId') employeeId: string) {
        return await this.queries.getEmployeeById(employeeId)
    }
    @Get("get-archived-employees")
    @ApiOkResponse({ type: EmployeeResponse })
    async getArchivedEmployees() {
        return await this.queries.getArchivedEmployees()
    }
    
    @Get("get-archived-employeesById/:employeeId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getArchivedEmployeeById(@Param('employeeId') employeeId: string) {
        console.log(employeeId)
        return await this.queries.getArchivedEmployeeById(employeeId)
    }
    @Post("archive-employee/:employeeId")
    @ApiOkResponse({ type: Boolean })
    async archiveEmployeeById(@Param('employeeId') employeeId: string) {
        return await this.commands.archiveEmployee(employeeId)
    }
    @Post("restore-employee/:employeeId")
    @ApiOkResponse({ type: Boolean })
    async restoreEmployeeById(@Param('employeeId') employeeId: string) {
        return await this.commands.unArchiveEmployee(employeeId)
    }
    @Post("delete-employee/:employeeId")
    @ApiOkResponse({ type: Boolean })
    async deleteEmployeeById(@Param('employeeId') employeeId: string) {
        return await this.commands.deleteEmployee(employeeId)
    }
    @Post("update-employee")
    @ApiOkResponse({ type: EmployeeResponse })
    async updateEmployee(@Body() updateEmployeeCommand: UpdateEmployeeCommand) {
        return await this.commands.updateEmployee(updateEmployeeCommand)
    }
    @Post("add-role-to-employee/:employeeId")
    @ApiOkResponse({ type: EmployeeResponse })
    async addRoleToEmployee(
        @Param('employeeId') employeeId: string,
        @Body() addRoleToEmployeeCommand: AddRoleToEmployeeCommand[]) {
        return await this.commands.addRoleToEmployeeCommand(addRoleToEmployeeCommand, employeeId)
    }
    /**
     * {
  "roleName": "string",
  "roleId": [
    "string"
  ],
  "createdAt": "2023-05-29T09:53:55.628Z"
}
     */
    @Get("get-role-by-employeeId/:employeeId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getRoleByEmployeeId(@Param('employeeId') employeeId: string) {
        console.log(employeeId)
        // const result:any=await this.queries.getEmployeeRoles(employeeId)[0].EmployeeRoleResponse;
        // result.EmployeeRoleResponse.name=result[0].emproleName;
        // console.log(await this.queries.getEmployeeRoles(employeeId))
        return await this.queries.getEmployeeRoles(employeeId)
    }
    @Get("get-role-by-employeefffffsId/:employeeId")
    @ApiOkResponse({ type: EmployeeResponse })
    async getRoleByEmployefffffffeId(@Param('employeeId') employeeId: string,@Body() addRoleToEmployeeCommand: AddRoleToEmployeeCommand[]) {
        console.log(employeeId)
        return await this.queries.getEmployeeRoles(employeeId)
    }
}
