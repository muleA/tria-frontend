/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { User } from "../domain/user";
import { Repository } from "typeorm";

import { UserRepository } from "../persistence/user.repository";
import { CreateUserCommand, UpdateUserCommand } from "./user.command";
import { UserResponse } from "./user.responses";
import * as bcrypt from 'bcrypt'

import {
    BadRequestException,
    NotFoundException,
    Inject,
    Logger,
} from "@nestjs/common";
import { CreateLicenseApllicantEducationCommand, UpdateEducationCommand } from "./licenseApllicantEducation.commands";
import { EducationResponse } from "./education.response";
import { InjectRepository } from "@nestjs/typeorm";
import { LicenseApplicantEducationEntity } from "../persistence/education.entity";
import { ExperienceResponses } from "./experience.responses ";
import { CreateLicenseApplicantExperienceCommand, UpdateExperienceCommand } from "./licenseApplicantExperience.command";
import { LicenseApplicantexperienceEntity } from "../persistence/experience.entity";
import { CreateCertificateCommand, UpdateCertificateCommand } from "./Certificate.commands";
import { CertificateResponse } from "./certificate.response";
import { CertificateEntity } from "../persistence/certificate.entity";
import { CreateAccountCommand, UpdateAccountCommand } from "./account.command";
import { AccountResponse } from "./account.response";
import { AccountEntity } from "../persistence/accounts.entity";
import { ApplicationResponse } from "./applicatopn.response";
import { ChangeApplicationStatusCommand, CreateApplicationCommand } from "./application.command";
import { LicenseApplicationEntity } from "../persistence/application.entity";
import { CreateLicenseCommand } from "./license.command";
import { LicenseResponse } from "./License.response";
import { LicenseEntity } from "../persistence/License.entity";

@Injectable()
export class UserCommand {
    private userDomain: User = new User()
    private logger = new Logger("UserService")
    constructor(
        private userRepository: UserRepository,
        @InjectRepository(LicenseApplicantEducationEntity)
        private educationRepository: Repository<LicenseApplicantEducationEntity>,
        @InjectRepository(LicenseApplicantexperienceEntity)
        private experienceRepository: Repository<LicenseApplicantexperienceEntity>,
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(LicenseApplicationEntity)
        private applicationRepository: Repository<LicenseApplicationEntity>,
        @InjectRepository(LicenseEntity)
        private licenseRepository: Repository<LicenseEntity>

    ) { }

    async createUser(command: CreateUserCommand): Promise<UserResponse> {
        try {
            const userEntity = CreateUserCommand.fromCommands(command)
            console.log('user inserted ', userEntity)

            this.userDomain = await this.userRepository.insertUser(userEntity)
            const account = await this.accountRepository.findOne({ where: { id: this.userDomain.accountId } })
            this.accountRepository.save(account)
            if (!this.userDomain) {

                throw new NotFoundException(`Failed to create user`);
            }
            return UserResponse.fromDomain(this.userDomain)
        } catch (error) {
            Logger.log('Unable to create the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveUser(userId: string): Promise<boolean> {
        try {
            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`User with Id ${userId} is not found `);
            }
            const result = this.userRepository.softDeleteUser(this.userDomain.id)
            this.logger.log(
                "Archive User command executed ",
                `user  ${this.userDomain.id} have been Archived`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Archive the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveUser(userId: string): Promise<boolean> {
        try {
            const result = await this.userRepository.restoreUser(
                userId
            );
            this.logger.log(
                "Restore User execute",
                `user ${userId} have been restored`
            );
            return result;
        } catch (error) {
            this.logger.log(`unable to retore user ${userId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateUser(updateUserCommand: UpdateUserCommand): Promise<UserResponse> {
        try {
            this.userDomain = await this.userRepository.findById(updateUserCommand.id)
            if (!this.userDomain) {
                throw new NotFoundException(`User with Id ${updateUserCommand.id} is not found `);
            }
            this.userDomain = UpdateUserCommand.fromCommands(updateUserCommand);
            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Delete User command executed ",
                `user  ${this.userDomain.id} have been Deleted`
            );
            return UserResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to Delete the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteUser(userId: string): Promise<boolean> {
        try {
            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`User with Id ${userId} is not found `);
            }
            const result = this.userRepository.deleteById(this.userDomain.id)
            this.logger.log(
                "Delete User command executed ",
                `user  ${this.userDomain.id} have been Deleted`
            );
            return result
        } catch (error) {
            Logger.log('Unable to Delete the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    //   this  is  service commands for education

    async createEducation(command: CreateLicenseApllicantEducationCommand): Promise<EducationResponse> {
        try {

            this.userDomain = await this.userRepository.findById(command.userId)

            if (!this.userDomain) {
                throw new NotFoundException(`Failed to create Education`);
            }
            const oldEducations = this.userDomain.education
            const education = CreateLicenseApllicantEducationCommand.fromCommands(command)

            console.log('Beffore education is added to the user array', this.userDomain)

            this.userDomain.education.push(education)
            console.log('after education is added to the user array', this.userDomain)
            this.userDomain = await this.userRepository.insertUser(this.userDomain)
            const newEducation = this.userDomain.education
            const differenceArray = newEducation.filter(obj1 => !oldEducations.some(obj2 => obj1.id === obj2.id));

            return EducationResponse.fromDomain(differenceArray[0])
        } catch (error) {
            Logger.log('Unable to create the Education because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveEducation(educationId: string): Promise<boolean> {
        try {
            const educationDomain = await this.educationRepository.findOneBy({ id: educationId })
            if (!educationDomain) {
                throw new NotFoundException(`Education with Id ${educationId} is not found `);
            }
            const result = await this.educationRepository.softDelete(educationId)
            this.logger.log(
                "Archive Education command executed ",
                `Education  ${this.userDomain.id} have been Archived`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Archive the education because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveEducation(educationId: string): Promise<boolean> {
        try {
            const result = await this.educationRepository.restore(educationId);
            this.logger.log(
                "Restore Education execute",
                `education ${educationId} have been restored`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            this.logger.log(`unable to retore education ${educationId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateEducation(updateEducationCommand: UpdateEducationCommand): Promise<EducationResponse> {
        try {
            this.userDomain = await this.userRepository.findById(updateEducationCommand.userId)
            if (!this.userDomain) {
                throw new NotFoundException(`User with Id ${updateEducationCommand.id} is not found `);
            }

            await this.userDomain.updateEducation(UpdateEducationCommand.fromCommands(updateEducationCommand))

            this.userDomain = await this.userRepository.updateUser(this.userDomain)
            const returnEducation = this.userDomain.education.find((element) => element.id == updateEducationCommand.id)
            this.logger.log(
                "Delete Education command executed ",
                `Education  ${this.userDomain.id} have been Deleted`
            );
            return EducationResponse.fromDomain(returnEducation)
        } catch (error) {
            Logger.log('Unable to update the Education because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteEducation(educationId: string): Promise<boolean> {
        try {
            const data = await this.educationRepository.findOneBy({ id: educationId })
            if (!data) {
                throw new NotFoundException(`Education with Id ${educationId} is not found `);
            }
            const result = await this.educationRepository.delete(data.id)
            this.logger.log(
                "Delete User command executed ",
                `user  ${this.userDomain.id} have been Deleted`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Delete the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    //   this  is  service commands for Expiriance

    async createExperience(command: CreateLicenseApplicantExperienceCommand): Promise<ExperienceResponses> {
        try {
            this.userDomain = await this.userRepository.findById(command.userId)
            if (!this.userDomain) {
                throw new NotFoundException(`Failed to create Experience`);
            }
            const oldExpiriance = this.userDomain.expiriance;
            const experience = CreateLicenseApplicantExperienceCommand.fromCommands(command)
            this.userDomain.expiriance.push(experience)
            this.userDomain = await this.userRepository.insertUser(this.userDomain)
            const newExpiriance = this.userDomain.expiriance
            const differenceArray = newExpiriance.filter(obj1 => !oldExpiriance.some(obj2 => obj1.id === obj2.id));

            return ExperienceResponses.fromDomain(differenceArray[0])
        } catch (error) {
            Logger.log('Unable to create the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveExperience(ExperienceId: string): Promise<boolean> {
        try {
            const experienceDomain = await this.experienceRepository.findOneBy({ id: ExperienceId })
            if (!experienceDomain) {
                throw new NotFoundException(`Experience with Id ${ExperienceId} is not found `);
            }
            const result = await this.experienceRepository.softDelete(ExperienceId)
            this.logger.log(
                "Archive Experience command executed ",
                `Experience  ${ExperienceId} have been Archived`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Archive the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveExperience(experienceId: string): Promise<boolean> {
        try {
            const result = await this.experienceRepository.restore(experienceId);
            this.logger.log(
                "Restore Experience execute",
                `Experience ${experienceId} have been restored`
            );
            console.log(result)
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            this.logger.log(`unable to retore Experience ${experienceId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateExperience(updateExperienceCommand: UpdateExperienceCommand): Promise<ExperienceResponses> {
        try {
            this.userDomain = await this.userRepository.findById(updateExperienceCommand.userId)
            if (!this.userDomain) {
                throw new NotFoundException(`User with Id ${updateExperienceCommand.id} is not found `);
            }
            // this.userDomain.expiriance.push(UpdateExperienceCommand.fromCommands(updateExperienceCommand));

            await this.userDomain.updateExpiriance(UpdateExperienceCommand.fromCommands(updateExperienceCommand))
            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Delete Experience command executed ",
                `Experience  ${this.userDomain.id} have been Deleted`
            );
            const single = result.expiriance.filter(
                (row) => row.id == updateExperienceCommand.id
            );
            console.log('single : ', single)
            // return UserResponse.fromDomain(result).expiriance
            return ExperienceResponses.fromDomain(single[0])
        } catch (error) {
            Logger.log('Unable to update the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteExperience(experienceId: string): Promise<boolean> {
        try {
            const data = await this.experienceRepository.findOneBy({ id: experienceId })
            if (!data) {
                throw new NotFoundException(`Experience with Id ${experienceId} is not found `);
            }
            const result = await this.experienceRepository.delete(data.id)
            this.logger.log(
                "Delete Experience command executed ",
                `Experience  ${this.userDomain.id} have been Deleted`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Delete the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    //   this  is  service commands for Certificate

    async createCertificate(command: CreateCertificateCommand): Promise<CertificateResponse> {
        try {
            this.userDomain = await this.userRepository.findById(command.userId)
            if (!this.userDomain) {
                throw new NotFoundException(`Failed to create Certificate`);
            }
            const oldCertificate = this.userDomain.certificate
            const certificate = CreateCertificateCommand.fromCommands(command)
            this.userDomain.certificate.push(certificate)
            this.userDomain = await this.userRepository.insertUser(this.userDomain)
            const newCertificate = this.userDomain.certificate
            const differenceArray = newCertificate.filter(obj1 => !oldCertificate.some(obj2 => obj1.id === obj2.id));

            return CertificateResponse.fromDomain(differenceArray[0])
        } catch (error) {
            Logger.log('Unable to create the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveCertificate(ExperienceId: string): Promise<boolean> {
        try {
            const result = await this.certificateRepository.softDelete(ExperienceId)
            this.logger.log(
                "Archive Certificate command executed ",
                `Certificate  ${ExperienceId} have been Archived`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Archive the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveCertificate(certificateId: string): Promise<boolean> {
        try {
            const result = await this.certificateRepository.restore(certificateId);
            this.logger.log(
                "Restore CertificateId execute",
                `certificateId ${certificateId} have been restored`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            this.logger.log(`unable to retore certificate ${certificateId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateCertificate(updateCertificateCommand: UpdateCertificateCommand): Promise<CertificateResponse> {
        try {
            this.userDomain = await this.userRepository.findById(updateCertificateCommand.userId)
            if (!this.userDomain) {
                throw new NotFoundException(`Certificate with Id ${updateCertificateCommand.id} is not found `);
            }
            this.userDomain.updateCertificate(UpdateCertificateCommand.fromCommands(updateCertificateCommand));
            this.userDomain = await this.userRepository.updateUser(this.userDomain)
            const result = this.userDomain.certificate.find((element) => element.id == updateCertificateCommand.id)
            this.logger.log(
                "Update Certificate command executed ",
                `Certificate  ${this.userDomain.id} have been Deleted`
            );

            return CertificateResponse.fromDomain(result)
        } catch (error) {
            Logger.log('Unable to update the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteCertificate(experienceId: string): Promise<boolean> {
        try {
            const result = await this.experienceRepository.delete(experienceId)
            this.logger.log(
                "Delete Certificate command executed ",
                `Certificate  ${this.userDomain.id} have been Deleted`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Delete the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    //   this  is  service commands for Account

    async createAccount(command: CreateAccountCommand): Promise<AccountResponse> {
        try {
            // this.userDomain = await this.userRepository.findById(command.userID)
            // if (!this.userDomain) {
            //     throw new NotFoundException(`Failed to create Account`);
            // }
            // this is for hashing the password
            // const salt = await bcrypt.genSalt()
            const salt = '$2a$12$2vzqgDZ6W0J2cE8BdJi5Fe'
            const password = await bcrypt.hash(command.Password, salt);
            command.Password = password
            const account = CreateAccountCommand.fromCommands(command)
            console.log(account)
            const result = await this.accountRepository.save(account)
            console.log(result)
            // return true;
            return AccountResponse.fromEntity(result)
        } catch (error) {
            Logger.log('Unable to create the Account because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveAccount(accountId: string): Promise<boolean> {
        try {
            const result = await this.accountRepository.softDelete(accountId)
            this.logger.log(
                "Archive Account command executed ",
                `Account  ${accountId} have been Archived`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Archive the Account because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveAccount(accountId: string): Promise<boolean> {
        try {
            const result = await this.accountRepository.restore(accountId);
            this.logger.log(
                "Restore Account execute",
                `Account ${accountId} have been restored`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            this.logger.log(`unable to retore certificate ${accountId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async updateAccount(updateAccountCommand: UpdateAccountCommand): Promise<AccountResponse> {
        try {
            // const accountDomain = await this.accountRepository.findOneBy({id:updateAccountCommand.id})
            // if (!accountDomain) {
            //     throw new NotFoundException(`Account with Id ${updateAccountCommand.id} is not found `);
            // }
            const accountCommand = UpdateAccountCommand.fromCommands(updateAccountCommand);
            const result = await this.accountRepository.save(accountCommand)
            this.logger.log(
                "Update Account command executed ",
                `Account  ${this.userDomain.id} have been updated`
            );
            return AccountResponse.fromEntity(result)
        } catch (error) {
            Logger.log('Unable to update the Experience because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async deleteAccount(accountId: string): Promise<boolean> {
        try {
            const result = await this.accountRepository.delete(accountId)
            this.logger.log(
                "Delete Account command executed ",
                `Account  ${this.userDomain.id} have been Deleted`
            );
            if (result.affected > 0) return true;
            return false;
        } catch (error) {
            Logger.log('Unable to Delete the Account because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async uploadEducationFile(path: string, userId: string, educationId: string): Promise<EducationResponse[]> {
        try {

            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`user with Id ${userId} not found`);
            }
            this.userDomain.addEducation(path, educationId)

            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Education add file command executed ",
            );
            return UserResponse.fromDomain(result).education
        } catch (error) {
            Logger.log('Unable to Delete the Account because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async uploadExperienceFile(filename: string, userId: string, educationId: string): Promise<ExperienceResponses[]> {
        try {

            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`user with Id ${userId} not found`);
            }

            this.userDomain.addExpiriance(filename, educationId)
            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Education add file command executed ",
            );
            return UserResponse.fromDomain(result).expiriance
        } catch (error) {
            Logger.log('Unable to Delete the Account because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async uploadCertificateFile(filename: string, userId: string, certificateId: string): Promise<CertificateResponse[]> {
        try {

            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`user with Id ${userId} not found`);
            }

            this.userDomain.addCertificate(filename, certificateId)
            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Certificate add file command executed ",
            );
            return UserResponse.fromDomain(result).certificate
        } catch (error) {
            Logger.log('Unable to Upload the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    //Applications

    async createApplication(command: CreateApplicationCommand, userId: string): Promise<any> {
        try {
            this.userDomain = await this.userRepository.findById(userId)
            console.log(this.userDomain)

            if (!this.userDomain) {
                throw new NotFoundException(`user with Id ${userId} not found`);
            }
            const application = CreateApplicationCommand.fromCommand(command)
            console.log(application)

            this.userDomain.application.push(application)
            this.userDomain = await this.userRepository.insertUser(this.userDomain)
            console.log('iiiiiinnnnssssseeeerrrttteeeddd', this.userDomain)
            return UserResponse.fromDomain(this.userDomain).appliaction
        } catch (error) {
            Logger.log('Unable to create the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async uploadDelegationFile(filename: string, userId: string, applicationId: string): Promise<ApplicationResponse[]> {
        try {

            this.userDomain = await this.userRepository.findById(userId)
            if (!this.userDomain) {
                throw new NotFoundException(`user with Id ${userId} not found`);
            }

            this.userDomain.addDelegation(filename, applicationId)
            const result = await this.userRepository.updateUser(this.userDomain)
            this.logger.log(
                "Certificate add file command executed ",
            );
            return UserResponse.fromDomain(result).appliaction
        } catch (error) {
            Logger.log('Unable to Upload the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async archiveApplication(applicationId: string): Promise<boolean> {
        try {
            const application = await this.applicationRepository.findOne({where:{id:applicationId}})
            if (!application) {
                throw new NotFoundException(`User with Id ${applicationId} is not found `);
            }
            const result = this.applicationRepository.softDelete(applicationId)
            this.logger.log(
                "Archive User command executed ",
                `user  ${this.userDomain.id} have been Archived`
            );
            return result?true:false
        } catch (error) {
            Logger.log('Unable to Archive the user because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async unArchiveApplication(applicationId: string): Promise<boolean> {
        try {
            const result = await this.applicationRepository.restore(
                applicationId
            );
            this.logger.log(
                "Restore Application execute",
                `application ${applicationId} have been restored`
            );
            return result?true:false;
        } catch (error) {
            this.logger.log(`unable to retore user ${applicationId}`)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async changeApplicationStatus(command: ChangeApplicationStatusCommand, applicationId: string): Promise<any> {
        try {
            const application = await this.applicationRepository.findOne({ where: { id: applicationId } })
            console.log(application)

            if (!application) {
                throw new NotFoundException(`application with Id ${applicationId} not found`);
            }

            application.status = command.status
            application.comment = command.comment


            const result = await this.applicationRepository.save(application)
            console.log('iiiiiinnnnssssseeeerrrttteeeddd', result)
            return ApplicationResponse.fromEntity(result)
        } catch (error) {
            Logger.log('Unable to create the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async giveAppointment(appointmentDate: Date, applicationId: string): Promise<any> {
        try {
            const application = await this.applicationRepository.findOne({ where: { id: applicationId } })
            console.log(application)

            if (!application) {
                throw new NotFoundException(`application with Id ${applicationId} not found`);
            }

            application.appointmentDate = appointmentDate

            const result = await this.applicationRepository.save(application)
            console.log('iiiiiinnnnssssseeeerrrttteeeddd', application)
            return ApplicationResponse.fromEntity(result)
        } catch (error) {
            Logger.log('Unable to give an apointment date because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }

    // License 
    async createLicense(command: CreateLicenseCommand, applicationId: string): Promise<any> {
        try {
            // const licenseDomain=new License
            const application = await this.applicationRepository.findOneBy({ id: applicationId })
            console.log(application)

            if (!application) {
                throw new NotFoundException(`Application with Id ${applicationId} not found`);
            }
            const applicationDomain = CreateLicenseCommand.fromCommands(command)

            application.license = CreateLicenseCommand.fromEntities(applicationDomain)
            console.log(' application ', application)
            const result = await this.applicationRepository.save(application)
            console.log('iiiiiinnnnssssseeeerrrttteeeddd', result)
            return ApplicationResponse.fromEntity(result)
        } catch (error) {
            Logger.log('Unable to create the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
    async ChangeLicenseStatus(licenseId: string, status: string): Promise<LicenseResponse> {
        try {
            const licenseDomain = await this.licenseRepository.findOne({ where: { id: licenseId } })
            console.log(licenseDomain)

            if (!licenseDomain) {
                throw new NotFoundException(`license with Id ${licenseId} not found`);
            }
            licenseDomain.status = status
            const result = await this.licenseRepository.save(licenseDomain)
            console.log('iiiiiinnnnssssseeeerrrttteeeddd', result)
            return LicenseResponse.fromEntity(licenseDomain)
        } catch (error) {
            Logger.log('Unable to create the Certificate because ', error)
            throw new BadRequestException(error.code, error.message);
        }
    }
}