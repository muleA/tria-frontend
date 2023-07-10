/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AccountResponse } from 'src/registration/useCases/account.response';
import { EmployeeQueries } from 'src/registration/useCases/employee.commands.ts/employee.usecase.queries';
import { BackOfficeAuthService } from './back-office-auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('Mailer')
@ApiTags('Mailer')
export class BackOfficeAuthController {
    constructor(
        private backOfficeAuthService: BackOfficeAuthService,
    ) {
    }
   
    @Get('send-email/:emailAddress/:message/:subject')
    async sendMail(
        @Param('emailAddress')emailAddress:string,
        @Param('message')message:string,
        @Param('subject')subject:string
        ) {
             subject==''?'This from IFHRS System By Tria PlC':subject;
             const html=''
        return this.backOfficeAuthService.sendMail(emailAddress,message,subject,html)
    }
    
    // @Post('login')
    // async login(@Request() req): Promise<any> {
    //     return this.backOfficeAuthService.generateToken(req.user)
    // }
    // @Get("get-employee-by-email/:email")
    // @ApiOkResponse({ type: AccountResponse })
    // async getEmployeeByEmail(@Param('email') email: string) {
    //     return await this.queries.getEmployeeByEmail(email)
    // }
    // @Get("get-account-by-email/:email")
    // @ApiOkResponse({ type: AccountResponse })
    // async getAccountByEmail(@Param('email') email: string) {
    //     return await this.queries.getAccountByEmail(email)

    // }
}
