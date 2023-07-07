/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "../persistence/user.entity";
import { UserResponse } from "./user.responses";
import { UserRepository } from "../persistence/user.repository";
import { EducationResponse } from "./education.response";
import { LicenseApplicantEducationEntity } from "../persistence/education.entity";
import { LicenseApplicantexperienceEntity } from "../persistence/experience.entity";
import { UpdateEducationCommand } from "./licenseApllicantEducation.commands";
import { ExperienceResponses } from "./experience.responses ";
import { CertificateResponse } from "./certificate.response";
import { CertificateEntity } from "../persistence/certificate.entity";
import { AccountResponse } from "./account.response";
import { AccountEntity } from "../persistence/accounts.entity";
import { ApplicationResponse } from "./applicatopn.response";
import { LicenseApplicationEntity } from "../persistence/application.entity";
import { LicenseResponse } from "./License.response";
import { LicenseEntity } from "../persistence/License.entity";
@Injectable()
export class UserQueries {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(LicenseApplicantEducationEntity)
        private educationRepository: Repository<LicenseApplicantEducationEntity>,
        @InjectRepository(LicenseApplicantexperienceEntity)
        private expirianceRepository: Repository<LicenseApplicantexperienceEntity>,
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>,
        @InjectRepository(AccountEntity)
        private accountRepository: Repository<AccountEntity>,
        @InjectRepository(LicenseApplicationEntity)
        private applicationRepository: Repository<LicenseApplicationEntity>,
        @InjectRepository(LicenseEntity)
        private licenseRepository: Repository<LicenseEntity>
        // private userRepository: UserRepository
    ) {
    }

    async fecthUser(): Promise<UserResponse[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const result = await queryBuilder.getMany();
        // const result = await this.userRepository.findAll();
        if (!result) {
            throw new NotFoundException(`There is no User !!`);
        }
        return result.map((element) => UserResponse.fromEntity(element))
    }
    async getUserByUserId(userId: string): Promise<UserResponse> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['certificate', "expiriance", "education"] })
        console.log('rrrrrrrrrrrrr ', result)
        if (result.length == 0) {
            throw new NotFoundException(`User with Id ${userId} is not found`);
        }
        return UserResponse.fromEntity(result[0])
    }
    async getArchivedUser(): Promise<UserResponse[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
        queryBuilder.withDeleted().where('user.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => UserResponse.fromEntity(element))
    }
    async getArchivedUserById(userId): Promise<UserResponse> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
        queryBuilder.withDeleted().where('user.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }

        const existIndex = result.findIndex(
            (element) => element.id == userId
        );
        console.log('999999999999999999999', result[existIndex])


        return UserResponse.fromEntity(result[existIndex])
    }
    /**
     * 
     * quries related to education 
     */

    async getArchivedEducations(userId: string): Promise<EducationResponse[]> {
        const queryBuilder = this.educationRepository.createQueryBuilder('education')
        queryBuilder.where('education.user_id=:userId', { userId }).withDeleted().andWhere('education.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => EducationResponse.fromEntity(element))
    }
    async getArchivedEducationById(educationId: string): Promise<EducationResponse> {
        const queryBuilder = this.educationRepository.createQueryBuilder('education')
        queryBuilder.withDeleted().where('education.id=:educationId', { educationId })
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (result.length == 0) return null
        if (!result || result.length == 0) {
            throw new NotFoundException(`Archived Education with Id ${educationId}  not found`);
        }
        return EducationResponse.fromEntity(result[0])
    }
    async getEducations(): Promise<EducationResponse[]> {
        const result = await this.educationRepository.find()

        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => EducationResponse.fromEntity(element))
    }
    async getEducationByUserId(userId: string): Promise<EducationResponse[]> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['education'] })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return UserResponse.fromEntity(result[0]).education
    }
    async getEducationByEducationId(educationId: string): Promise<EducationResponse> {
        const result = await this.educationRepository.findOne({ where: { id: educationId } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Education with Id ${educationId} is  not found`);
        }
        return EducationResponse.fromEntity(result)
    }
    /**
         * 
         * quries related to expiriance 
         */
    async getArchivedExpiriance(userId: string): Promise<ExperienceResponses[]> {
        const queryBuilder = this.expirianceRepository.createQueryBuilder('experience')
        queryBuilder.where('experience.userId=:userId', { userId }).withDeleted().andWhere('experience.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived Experience  not found`);
        }
        return result.map((element) => ExperienceResponses.fromEntity(element))
    }
    async getArchivedExpirianceById(expirianceId: string): Promise<ExperienceResponses> {
        const queryBuilder = this.expirianceRepository.createQueryBuilder('experience')
        queryBuilder.withDeleted().where('experience.id=:expirianceId', { expirianceId })
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (result.length == 0) return null
        if (!result || result.length == 0) {
            throw new NotFoundException(`Archived Expereiance with Id ${expirianceId}  not found`);
        }
        return ExperienceResponses.fromEntity(result[0])
    }
    // async getExpiriances(userId:string): Promise<ExperienceResponses[]> {
    //     const result = await this.userRepository.find({relations:['expiriance']})
    //     if (!result) {
    //         throw new NotFoundException(`Archived users  not found`);
    //     }
    //    return  result[0].expiriance.map((element)=>ExperienceResponses.fromEntity(element))
    // }
    async getExpirianceByUserId(userId: string): Promise<ExperienceResponses[]> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['expiriance'] })
        if (!result || result.length == 0) {
            throw new NotFoundException(`Expirinace for  user  with Id ${userId} not found`);
        }
        return UserResponse.fromEntity(result[0]).expiriance
    }
    async getExpirianceById(expirianceId: string): Promise<ExperienceResponses[]> {
        const result = await this.expirianceRepository.find({ where: { id: expirianceId } })
        if (!result || result.length == 0) {
            throw new NotFoundException(`Expirinace for  user  with Id ${expirianceId} not found`);
        }
        return result.map((element) => ExperienceResponses.fromEntity(element))
    }
    /**
     * 
     * quries related to Certificate  
     */
    async getArchivedCertificate(userID): Promise<CertificateResponse[]> {
        const queryBuilder = this.certificateRepository.createQueryBuilder('certificate')
        queryBuilder.withDeleted().where('certificate.user_id=:userID', { userID }).andWhere('certificate.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        if (!result) {
            throw new NotFoundException(`Archived certificate  not found`);
        }
        return result.map((element) => CertificateResponse.fromEntity(element))
    }
    async getArchivedCertificateById(certificateId: string): Promise<CertificateResponse> {
        const queryBuilder = this.certificateRepository.createQueryBuilder('certificate')
        queryBuilder.withDeleted().where('certificate.id=:certificateId', { certificateId })
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (result.length == 0) return null
        if (!result || result.length == 0) {
            throw new NotFoundException(`Archived Certificate  with Id ${certificateId}  not found`);
        }
        return CertificateResponse.fromEntity(result[0])
    }
    async getCertificate(CertificateId: string): Promise<CertificateResponse> {
        const result = await this.certificateRepository.findOne({ where: { id: CertificateId } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return CertificateResponse.fromEntity(result)
    }
    async getCertificateByUserId(userId: string): Promise<CertificateResponse[]> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['certificate'] })
        console.log('result', result)
        if (!result || result.length == 0) {
            throw new NotFoundException(`Certificate for user with  Id ${userId}  not found`);
        }
        return UserResponse.fromEntity(result[0]).certificate
    }
    async getCertificates(): Promise<CertificateResponse[]> {
        const result = await this.certificateRepository.find()

        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Expiriance is not found`);
        }
        return result.map((element) => CertificateResponse.fromEntity(element))
    }
    // quries related to Account
    async getArchivedAccountByUserId(userID): Promise<AccountResponse> {
        const queryBuilder = this.accountRepository.createQueryBuilder('account')
        queryBuilder.withDeleted().where('account.user_id=:userID', { userID })
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (result.length == 0) return null
        if (!result || result.length == 0) {
            throw new NotFoundException(`Archived Account  not found`);
        }
        return AccountResponse.fromEntity(result[0])
    }
    async getAccounts(userId: string): Promise<AccountResponse> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['account'] })
        console.log('result', result)
        if (result.length == 0) return null
        return result ? AccountResponse.fromEntity(result[0].account) : null
    }
    async getAccountByUserId(userId: string): Promise<AccountResponse> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['account'] })
        if (result.length == 0) return null
        if (!result) {
            throw new NotFoundException(` Account  not found`);
        }
        return UserResponse.fromEntity(result[0]).account
    }
    async getAccountByAccountId(accountId: string): Promise<AccountResponse> {
        console.log('account Id is : ',accountId)
        const result = await this.accountRepository.findOne({ where: { id: accountId }})
        console.log('account Id is : ',result)

        // if (result.length == 0) return null
        if (!result) {
            throw new NotFoundException(` Account  not found`);
        }
        return AccountResponse.fromEntity(result)
    }
    async getUserIdBycredentials(userName: string, password: string): Promise<AccountResponse> {
        const result = await this.accountRepository.find({ where: { userName: userName, password: password } })
        console.log('result', result)
        if (result.length == 0) return null
        return result ? AccountResponse.fromEntity(result[0]) : null
    }
    //get Files
    async getEducationFileByUserId(userId: string, educationId: string): Promise<string> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['education'] })
        const education = result[0].education.find((element) => { return element.id == educationId })

        return education.file

    }
    async getEducationFileNameByUserId(userId: string, educationId: string): Promise<string> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['education'] })
        const expiriance = result[0].education.find((element) => { return element.id == educationId })
        return expiriance.file

    }

    async getExperienceFileNameByUserId(userId: string, expirianceId: string): Promise<string> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['expiriance'] })

        const expiriance = result[0].expiriance.find((element) => { return element.id == expirianceId })
        return expiriance.file

    }
    async getExperiences(): Promise<ExperienceResponses[]> {
        const result = await this.expirianceRepository.find()

        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Expiriance is not found`);
        }
        return result.map((element) => ExperienceResponses.fromEntity(element))
    }
    async getCertificateFileNameByUserId(userId: string, certificateId: string): Promise<string> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['certificate'] })
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrr', result[0].certificate)
        const expiriance = result[0].certificate.find((element) => { return element.id == certificateId })
        return expiriance.file;
    }

    // for Authentication 
    async getUserByEmail(email: string): Promise<any> {
        console.log('ttttttttt', await this.userRepository.findOne({ where: { email } }))
        return this.userRepository.findOne({ where: { email: email } })
        // const user= this.accountRepository.findOne({where:{email}})
    }

    async getAccountById(id: string): Promise<any> {
        return this.accountRepository.findOne({ where: { id } })
    }
    async getAccountByEmail(email: string): Promise<any> {
        const result = await this.accountRepository.findOne({ where: { email: email } })
        return result
    }

    // Application

    async getApplicationByUserId(userId: string): Promise<ApplicationResponse[]> {
        console.log('I am on services ')
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['applications'] })
        console.log('result', result)
        if (!result || result.length == 0) {
            throw new NotFoundException(`Appliaction with userID ${userId}  not found`);
        }
        console.log(result)
        // console.log(UserResponse.fromEntity(result[0]).appliaction)
        return UserResponse.fromEntity(result[0]).appliaction
    }
    async getArchivedApplication(): Promise<ApplicationResponse[]> {
        const queryBuilder = this.applicationRepository.createQueryBuilder('license_application')
        queryBuilder.withDeleted().where('license_application.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Application users  not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getArchivedApplicationById(userId): Promise<ApplicationResponse[]> {
        const queryBuilder = this.applicationRepository.createQueryBuilder('license_application')
        queryBuilder.withDeleted().where('license_application.deletedAt is not null').andWhere('license_application.userId=:userId', { userId })
        console.log(queryBuilder.getSql())
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`No Archived Application  found for  users ${userId} found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getApplicationDetail(applicationId: string): Promise<any> {
        console.log('result', applicationId)
        const result = await this.applicationRepository.findOne({ where: { id: applicationId } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Application with ID ${applicationId}  not found`);
        }
        const data = ApplicationResponse.fromEntity(result)
        const expiriance: ExperienceResponses[] = [];
        const education: EducationResponse[] = [];
        const certificate: CertificateResponse[] = [];
        for (let index = 0; index < data.experienceId.length; index++) {
            const res = ExperienceResponses.fromEntity(await this.expirianceRepository.findOne({ where: { id: data.experienceId[index] } }))
            expiriance.push(res)
        }
        for (let index = 0; index < data.educationId.length; index++) {
            const edu = await this.educationRepository.findOne({ where: { id: data.educationId[index] } })
            const res = EducationResponse.fromEntity(edu)
            education.push(res)
        }
        for (let index = 0; index < data.certificateId.length; index++) {
            const res = CertificateResponse.fromEntity(await this.certificateRepository.findOne({ where: { id: result.certificateId[index] } }))
            certificate.push(res)
        }
        result['expiriance'] = expiriance
        result['education'] = education
        result['certificate'] = certificate

        return result
    }
    async getApplicationWithLicenseByUserId(userId: string): Promise<any> {
        console.log('result', userId)
        const result = await this.applicationRepository.find({ where: { userId: userId },relations:['license'] })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Application with  User ID ${userId}  not found`);
        }
        // const data = result.map((element)=>ApplicationResponse.fromEntity(element))
        // const expiriance: ExperienceResponses[] = [];
        // const education: EducationResponse[] = [];
        // const certificate: CertificateResponse[] = [];
        // for (let index = 0; index < data.experienceId.length; index++) {
        //     const res = ExperienceResponses.fromEntity(await this.expirianceRepository.findOne({ where: { id: data.experienceId[index] } }))
        //     expiriance.push(res)
        // }
        // for (let index = 0; index < data.educationId.length; index++) {
        //     const edu = await this.educationRepository.findOne({ where: { id: data.educationId[index] } })
        //     const res = EducationResponse.fromEntity(edu)
        //     education.push(res)
        // }
        // for (let index = 0; index < data.certificateId.length; index++) {
        //     const res = CertificateResponse.fromEntity(await this.certificateRepository.findOne({ where: { id: result.certificateId[index] } }))
        //     certificate.push(res)
        // }
        // result['expiriance'] = expiriance
        // result['education'] = education
        // result['certificate'] = certificate

        return result.map((element)=>ApplicationResponse.fromEntity(element))
    }
    async getApplicationByStatus(status: string): Promise<ApplicationResponse[]> {
        const result = await this.applicationRepository.find({ where: { status: status } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Application with ${status} status    not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getDelegationFileNameByUserId(userId: string, applicationId: string): Promise<string> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['applications'] })
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrr', result[0].applications)
        const application = result[0].applications.find((element) => { return element.id == applicationId })
        return application.file;
    }

    async getApplications(): Promise<ApplicationResponse[]> {
        const result = await this.applicationRepository.find({ relations: ['user'] })
        console.log('dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd')
        console.log('resulttttttttttt', result)
        if (!result) {
            throw new NotFoundException(`Applications   not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getSubmitedApplications(): Promise<ApplicationResponse[]> {
        const result = await this.applicationRepository.find({ where: { status: "SUBMITED" }, relations: ['user'] })

        console.log('resulttttttttttt', result)
        if (!result) {
            throw new NotFoundException(`Applications   not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    // License
    async getLicenseByApplicationId(applicationId: string): Promise<ApplicationResponse> {
        const result = await this.applicationRepository.find({ where: { id: applicationId }, relations: ['license'] })
        console.log('resultddddddssssssssssssssssssssssssss', result)
        if (!result || result.length==0) {
            throw new NotFoundException(`License for the application Id ${applicationId} is  not found`);
        }
        console.log('resultdddddd', ApplicationResponse.fromEntity(result[0]))
        
        return ApplicationResponse.fromEntity(result[0])
    }

    async getLicenseById(licenseId: string): Promise<any> {
        try {
            console.log(licenseId)
            const result = await this.licenseRepository.findOne({ where: { id: licenseId } })
            console.log('result', result)
            if (!result) {
                return []
            }
            return LicenseResponse.fromEntity(result)
        } catch (error) {
            return []
        }
    }
    async getLicenseBylicenseNumber(licenseNumber: string): Promise<any> {
        try {
            console.log(licenseNumber)
            const result = await this.licenseRepository.findOne({ where: { licenseNumber: licenseNumber } })
            console.log('result', result)
            if (!result) {
                return []
            }
            return LicenseResponse.fromEntity(result)
        } catch (error) {
            return []
        }
    }
    async getLicenseByStatus(status: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { status: status } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
    async getLicenseByStatusByUserId(status: string, userId: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { userId: userId, status: status } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
    async getLicenseByUserId(userId: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { userId: userId } })
        console.log('resultddddd', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
    async getLicenseByUserIdStatus(userId: string, status: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { userId: userId, status: status } })
        console.log('resultddddd', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
    async getLicenses(): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({relations:['user']})
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses   not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
    async getExpiredLicenses(): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => LicenseResponse.fromEntity(element))
    }
}