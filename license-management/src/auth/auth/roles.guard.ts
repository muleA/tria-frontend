/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import * as jwt from 'jsonwebtoken';
import { EmployeeQueries } from "src/registration/useCases/employee.commands.ts/employee.usecase.queries";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private refelector: Reflector,
        private employeeService: EmployeeQueries
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.refelector.get<string[]>('roles', context.getHandler());

        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization;
        // const token = authHeader.split(' ')[1]
        const employee = jwt.decode(token)
        console.log(employee)
        // Do something with the token
        // console.log('authHeader:', authHeader);
        if (request?.user) {
            console.log('444444444444444444444444444444444444444')
            const { id } = request.user;
            const employeeRole = await this.employeeService.getEmployeeRoles(id)
            const employeeRoleNames = employeeRole.map((role) => role.roleName);
            console.log(roles.some((elem) => employeeRoleNames.includes(elem)))
            return roles.some((elem) => employeeRoleNames.includes(elem));
            // return roles.includes(employee.employeeRole)
        }
        console.log('my rles', roles)
        return false
    }

}