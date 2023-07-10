/* eslint-disable prettier/prettier */

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateAccountCommand{
    @ApiProperty()
    @IsNotEmpty()
    username:string
    @ApiProperty()
    @IsNotEmpty()
    password:string
}