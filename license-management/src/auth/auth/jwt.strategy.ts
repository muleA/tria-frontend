/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserQueries } from "src/registration/useCases/users.usecase.queries";
import { Injectable,UnauthorizedException,NotFoundException } from "@nestjs/common";
import { EmployeeQueries } from "src/registration/useCases/employee.commands.ts/employee.usecase.queries";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        private userService:UserQueries,
        ){
        
        super({
             
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'asdasghgfhgfh355dfgfg345345'
        });
    }
    async validate(payload:any){
        return {
            id:payload.sub,
            name:payload.name,
            createdAt:payload.createdAt
        }
    }
}