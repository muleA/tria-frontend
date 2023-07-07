/* eslint-disable prettier/prettier */
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { EmployeeQueries } from "src/registration/useCases/employee.commands.ts/employee.usecase.queries";

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private quries:EmployeeQueries) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'asdasghgfhgfh355dfgfg345345'
        });
    }

    async validate(payload: any) {
        return {
            name: payload.payloadName,
            firstName: payload.firstName,
            lastName: payload.lastName,
            createdAt: payload.createdAt,
            accountId: payload.accountId,
            employeeId: payload.id,
            sub: payload.id,
            userName: payload.email,
            EmployeeRoles:payload.employeeRoles
        }
    }
}