/* eslint-disable prettier/prettier */
import { Injectable, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UserQueries } from 'src/registration/useCases/users.usecase.queries';
import * as bcrypt from "bcrypt"
import { Repository } from "typeorm";
import { AccountResponse } from 'src/registration/useCases/account.response';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountEntity } from 'src/registration/persistence/accounts.entity';
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
@Injectable()
export class AuthService {
    constructor(
        private userService: UserQueries,
        private employeeService: EmployeeQueries,
        private jwtService: JwtService
    ) { }

    async validateUserCreds(email: string, password: string): Promise<any> {
        const account = await this.userService.getAccountByEmail(email)
        // console.log('the Account is ', account)
        if (account?.accountType == 'employee' || account?.accountType == 'Admin') {
            const user = await this.employeeService.getEmployeeByEmail(email)

            if (!user) { throw new NotFoundException(); }

            if (!(await bcrypt.compare(password, account.password))) { throw new UnauthorizedException(); }
            user.type = 'employee'
            return user
        } else if (account?.accountType === 'user') {
            const user = await this.userService.getUserByEmail(email)

            if (!user) { throw new NotFoundException(); }

            if (!(await bcrypt.compare(password, account.password))) { throw new UnauthorizedException(); }
            user.type = 'user'
            return user
        }
    }


    generateToken(user: any) {
        console.log('userttttttttttttt ', user)
        if (user.type == 'user') {
            return {
                access_token: this.jwtService.sign({
                    name: user.userName,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    account: user.id,
                    accountType:user.type,
                    sub: user.userId,
                    createdAt: user.createdAt,
                    accountId: user.accountId,
                    userId: user.id,
                    userName: user.email
                })
            }
        } else if (user.type == 'employee'||user.type == 'Admin') {
            const employeeRoles = user?.employeeRole
            return {
                access_token: this.jwtService.sign({
                    name: user.userName,
                    firstName: user.firstName,
                    middleName: user.middleName,
                    lastName: user.lastName,
                    createdAt: user.createdAt,
                    accountType:user.type,
                    accountId: user.accountId,
                    employeeId: user.id,
                    sub: user.id,
                    userName: user.email,
                    EmployeeRoles: employeeRoles,
                })
            }
        } else{
            throw new NotFoundException(`the userType ${user.type} is not valid `);
        }
    }
}
