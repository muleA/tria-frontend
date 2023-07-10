/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';

@Injectable()
export class BackOfficeAuthService {
    constructor(
        private employeeService:EmployeeQueries,
        private jwtService:JwtService
    ){}
    async validateUserCreds(email: string, password: string):Promise<any>{
        const employee=await this.employeeService.getEmployeeByEmail(email)
        console.log('employee ',employee)
        const account=await this.employeeService.getAccountById(employee.accountId)
        if(!employee) {throw new NotFoundException(); }
        if(!(await bcrypt.compare(password,account.password))) {throw new UnauthorizedException();}
        return employee
    }

    
     generateToken(employee:any){
        const employeeRoles=employee?.employeeRole?.map((element)=>element.roleName)
        return {
            access_token:this.jwtService.sign({
                name:employee.userName,
                firstName:employee.firstName,
                lastName:employee.lastName,
                createdAt:employee.createdAt,
                accountId:employee.accountId,
                employeeId:employee.id,
                sub:employee.id,
                userName:employee.email,
                EmployeeRoles:employeeRoles
            })
        }
    }
}
