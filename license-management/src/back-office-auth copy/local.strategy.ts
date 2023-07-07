/* eslint-disable prettier/prettier */
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException, ExecutionContext } from "@nestjs/common";
import { BackOfficeAuthService } from "./back-office-auth/back-office-auth.service";

@Injectable()
export class BackLocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private backOfficeAuthService: BackOfficeAuthService
    ) {
        super()
    }
    async validate(username: string, password: string): Promise<any> {
        const employee = await this.backOfficeAuthService.validateUserCreds(username, password)

        if (!employee) throw new UnauthorizedException();
        return employee
    }
}