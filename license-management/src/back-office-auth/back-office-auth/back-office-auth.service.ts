/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt"
import {MailerService  } from "@nestjs-modules/mailer";

@Injectable()
export class BackOfficeAuthService {
    constructor(
        private readonly mailService:MailerService,
    ){}
    async sendMail(emailAddress: string,message: string,subject:string,html:string):Promise<any>{
        console.log(emailAddress)
        this.mailService.sendMail({
            to:emailAddress,
            from:'yayasoles@gmail.com',
            subject:subject,
            text:message,
            html:html
        })
        return 'Messgge Sent'
    }

    
    //  generateToken(employee:any){
    //     const employeeRoles=employee?.employeeRole?.map((element)=>element.roleName)
    //     return {
    //         access_token:this.jwtService.sign({
    //             name:employee.userName,
    //             firstName:employee.firstName,
    //             lastName:employee.lastName,
    //             createdAt:employee.createdAt,
    //             accountId:employee.accountId,
    //             employeeId:employee.id,
    //             sub:employee.id,
    //             userName:employee.email,
    //             EmployeeRoles:employeeRoles
    //         })
    //     }
    // }
}
