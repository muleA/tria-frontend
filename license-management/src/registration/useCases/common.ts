/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger"

export class Common {
    @ApiProperty()
    createdAt: Date
    @ApiProperty()
    createdBy: string
    @ApiProperty()
    updatedAt: Date
    @ApiProperty()
    updatedBy: string
    @ApiProperty()
    deletedAt: Date
    @ApiProperty()
    deletedBy: string
}