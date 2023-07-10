/* eslint-disable prettier/prettier */

import { Certificate } from "./Certificate";
import { License } from "./License";
import { UserAcount } from "./account";
import { LicenseApplicantEducation } from "./licenseApplicantEducation";
import { LicenseApplicantExperience } from "./licenseApplicantExperience";
import { LicenseApplication } from "./licenseApplication";
import * as fs from 'fs';

export class User {
  id: string;
  accountId:string 
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
  houseNumber: string;
  profilePicture: string;

  education: LicenseApplicantEducation[];
  expiriance: LicenseApplicantExperience[];
  certificate: Certificate[];
  application: LicenseApplication[]
  license:License[]
  


  createdAt: Date
  createdBy: string
  deletedAt: Date
  deletedBy: string
  updatedAt: Date
  updatedBy: string

  async updateEducation(licenseApplicantEducation: LicenseApplicantEducation) {
    console.log('88888888888888888888',licenseApplicantEducation.id)

    const existIndex = this.education.findIndex(
      (element) => element.id == licenseApplicantEducation.id
    );
    console.log('999999999999999999999',this.education[existIndex])

    this.education[existIndex] = licenseApplicantEducation;
  }
  async updateExpiriance(licenseApplicantExperience: LicenseApplicantExperience) {
    const existIndex = this.expiriance.findIndex(
      (element) => element.id == licenseApplicantExperience.id
    );
    this.expiriance[existIndex] = licenseApplicantExperience;
  }
  async updateCertificate(certificate: Certificate) {
    const existIndex = this.certificate.findIndex(
      (element) => element.id == certificate.id
    );
    this.certificate[existIndex] = certificate;
  }
  async addEducation(path: string, educationId: string) {
    const existIndex = this.education.findIndex(
      (element) => element.id == educationId.trim()
    );
    if(this.education[existIndex].file!==''){
      fs.unlink(`./uploads/education/${this.education[existIndex].file}`, (error) => {
        if (error) {
          console.error('Error removing file:', error);
        } else {
          console.log('File removed successfully');
        }
      });
    }
    this.education[existIndex].file = path;
  }
  async addExpiriance(path: string, expirianceId: string) {
    const existIndex = this.expiriance.findIndex(
      (element) => element.id.trim() == expirianceId.trim()
    );
    if(this.expiriance[existIndex].file!==''){
      fs.unlink(`./uploads/experience/${this.expiriance[existIndex].file}`, (error) => {
        if (error) {
          console.error('Error removing file:', error);
        } else {
          console.log('File removed successfully');
        }
      });
    }
    this.expiriance[existIndex].file = path;
  }
  async addCertificate(path: string, certificateId: string) {
    const existIndex = this.certificate.findIndex(
      (element) => element.id.trim() == certificateId.trim()
    );
    if(this.certificate[existIndex].file!==''){
      fs.unlink(`./uploads/certificate/${this.certificate[existIndex].file}`, (error) => {
        if (error) {
          console.error('Error removing file:', error);
        } else {
          console.log('File removed successfully');
        }
      });
    }
    this.certificate[existIndex].file = path;
  }
  async addDelegation(path: string, applicationId: string) {
    const existIndex = this.application.findIndex(
      (element) => element.id.trim() == applicationId.trim()
    );
    if(this.application[existIndex].file!==''){
      fs.unlink(`./uploads/delegation/${this.application[existIndex].file}`, (error) => {
        if (error) {
          console.error('Error removing file:', error);
        } else {
          console.log('File removed successfully');
        }
      });
    }
    this.application[existIndex].file = path;
  }
}