/* eslint-disable prettier/prettier */

import { User } from "./user"

export class LicenseApplicantExperience{
    id:string
    userId:string
    tin:string
    organizationName:string
    subCity:string
    woreda:string
    kebela:string
    file:string
    user:User

    createdAt:Date
    createdBy:string
    deletedAt:Date
    deletedBy:string
    updatedAt:Date
    updatedBy:string
} 