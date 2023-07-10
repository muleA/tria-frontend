/* eslint-disable prettier/prettier */

import { EmployeeRole } from "./employee-role";



export class Employee {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: string;
  subCity: string;
  city: string;
  wereda: string;
  kebele: string;
  phone: string;
  email: string;
  status: string;
  houseNumber: string;
  employeeRole: EmployeeRole[];


  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string

  // async updateRole(role: Role) {
    // const existIndex = this.expiriance.findIndex(
    //   (element) => element.id == licenseApplicantEducation.id
    // );
    // this.education[existIndex] = licenseApplicantEducation;
  // }
  // async updateExpiriance(licenseApplicantExperience: LicenseApplicantExperience) {
  //   const existIndex = this.expiriance.findIndex(
  //     (element) => element.id == licenseApplicantExperience.id
  //   );
  //   this.expiriance[existIndex] = licenseApplicantExperience;
  // }
 
}