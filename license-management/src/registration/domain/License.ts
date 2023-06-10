/* eslint-disable prettier/prettier */
import { LicenseApplication } from "./licenseApplication";
import { User } from "./user";

export class License   {
    id:string
    applicationId:string
    validFrom: Date;
    validTo: Date;
    userId:string
    applierType:string
    status:string
    comment:string
    user:User
    application:LicenseApplication

    createdAt:Date
    createdBy:string
    deletedAt:Date
    deletedBy:string
    updatedAt:Date
    updatedBy:string
  }