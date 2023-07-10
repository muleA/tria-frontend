/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountResponse } from 'src/registration/useCases/account.response';
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { BackOfficeAuthService } from './back-office-auth.service';
import { LocalAuthGuard } from '../local-auth.guard';
import { AuthGuard } from '@nestjs/passport';

// @Controller('back-office-auth')
// @ApiTags('back-office-auth')
export class BackOfficeAuthController {
    constructor(
        private backOfficeAuthService: BackOfficeAuthService,
        private queries: EmployeeQueries
    ) {
    }
    @UseGuards(LocalAuthGuard)
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req): Promise<any> {
        return this.backOfficeAuthService.generateToken(req.user)
    }
    @Get("get-employee-by-email/:email")
    @ApiOkResponse({ type: AccountResponse })
    async getEmployeeByEmail(@Param('email') email: string) {
        return await this.queries.getEmployeeByEmail(email)
    }
    @Get("get-account-by-email/:email")
    @ApiOkResponse({ type: AccountResponse })
    async getAccountByEmail(@Param('email') email: string) {
        return await this.queries.getAccountByEmail(email)

    }
}
