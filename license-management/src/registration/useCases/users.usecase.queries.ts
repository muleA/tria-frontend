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
        const result = await this.userRepository.find({where:{id: userId },relations:['certificate']})
        if (!result) {
            throw new NotFoundException(`User with Id ${userId} is not found`);
        }
        return UserResponse.fromEntity(result[0])
    }
    async getArchivedUser(): Promise<UserResponse[]> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
        queryBuilder.withDeleted().where('user.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result= await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => UserResponse.fromEntity(element))
    }
    /**
     * 
     * quries related to education 
     */

    async getArchivedEducations(userId:string): Promise<EducationResponse[]> {
        const queryBuilder = this.educationRepository.createQueryBuilder('education')
        queryBuilder.where('education.user_id=:userId',{userId}).withDeleted().andWhere('education.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => EducationResponse.fromEntity(element))
    }
    async getEducations(): Promise<EducationResponse[]> {
        const result = await this.educationRepository.find()

        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element)=>EducationResponse.fromEntity(element))
    }
    async getEducationByUserId(userId: string): Promise<EducationResponse[]> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['education'] })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return UserResponse.fromEntity(result[0]).education
    }
    /**
         * 
         * quries related to expiriance 
         */
    async getArchivedExpiriance(userId:string): Promise<ExperienceResponses[]> {
        const queryBuilder = this.expirianceRepository.createQueryBuilder('experience')
        queryBuilder.where('experience.userId=:userId',{userId}).withDeleted().andWhere('experience.deletedAt IS NOT NULL')
        const result = await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived Experience  not found`);
        }
        return result.map((element) => ExperienceResponses.fromEntity(element))
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
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return UserResponse.fromEntity(result[0]).expiriance
    }
    /**
     * 
     * quries related to Certificate  
     */ 
    async getArchivedCertificate (userID): Promise<CertificateResponse[]> {
        const queryBuilder=  this.certificateRepository.createQueryBuilder('certificate')
        queryBuilder.withDeleted().where('certificate.user_id=:userID',{userID}).andWhere('certificate.deletedAt IS NOT NULL')
        const result =await queryBuilder.getMany()
        if (!result) {
            throw new NotFoundException(`Archived certificate  not found`);
        }
        return  result.map((element)=>CertificateResponse.fromEntity(element))
    }
    async getCertificate (CertificateId:string): Promise<CertificateResponse> {
        const result=  await this.certificateRepository.findOne({where:{id:CertificateId}})
        console.log('result',result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return CertificateResponse.fromEntity(result)
    }
    async getCertificateByUserId(userId:string): Promise<CertificateResponse[]> {
        const result=  await  this.userRepository.find({where:{id:userId},relations:['certificate']})
        console.log('result',result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return UserResponse.fromEntity(result[0]).certificate
    }

    // quries related to Account
    
    async getArchivedAccountByUserId (userID): Promise<AccountResponse> {
        const queryBuilder=  this.accountRepository.createQueryBuilder('account')
        queryBuilder.withDeleted().where('account.user_id=:userID',{userID})
        console.log(queryBuilder.getSql())
        const result =await queryBuilder.getMany()
        console.log('result',result)
        if(result.length==0) return null
        if (!result) {
            throw new NotFoundException(`Archived Account  not found`);
        }
        return  AccountResponse.fromEntity(result[0])
    }
    async getAccounts (userId:string): Promise<AccountResponse> {
        const result=  await this.userRepository.find({where:{id:userId},relations:['account']})
        console.log('result',result)
        if(result.length==0) return null
        return result ? AccountResponse.fromEntity(result[0].account):null
    }
    async getAccountByUserId(userId:string): Promise<AccountResponse> {
        const result=  await  this.userRepository.find({where:{id:userId},relations:['account']})
        if(result.length==0) return null
        if (!result) {
            throw new NotFoundException(`Archived Account  not found`);
        }
        return UserResponse.fromEntity(result[0]).account
    }
    async getUserIdBycredentials(userName:string,password:string): Promise<AccountResponse> {
        const result=  await  this.accountRepository.find({where:{userName:userName,password:password}})
        console.log('result',result)
        if(result.length==0) return null
        return result ? AccountResponse.fromEntity(result[0]):null
    }
    //get Files
    async getEducationFileByUserId(userId:string,educationId:string): Promise<string> {
        const result= await this.userRepository.find({where:{id:userId},relations:['education']})
        const education=result[0].education.find((element)=>{return element.id==educationId})

        return education.file
        
    }
    async getEducationFileNameByUserId(userId:string,educationId:string): Promise<string> {
        const result= await this.userRepository.find({where:{id:userId},relations:['education']})
        const expiriance=result[0].education.find((element)=>{return element.id==educationId})
        return expiriance.file
        
    }
    
    async getExperienceFileNameByUserId(userId:string,expirianceId:string): Promise<string> {
        const result= await this.userRepository.find({where:{id:userId},relations:['expiriance']})

        const expiriance=result[0].expiriance.find((element)=>{return element.id==expirianceId})
        return expiriance.file
        
    }
    
    async getCertificateFileNameByUserId(userId:string,certificateId:string): Promise<string> {
        const result= await this.userRepository.find({where:{id:userId},relations:['certificate']})
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrr',result[0].certificate)
        const expiriance=result[0].certificate.find((element)=>{return element.id==certificateId})
        return expiriance.file;
    }

    // for Authentication 
    async getUserByEmail(email:string): Promise<any> {
        console.log('ttttttttt',await this.userRepository.findOne({where:{email}}))
        return this.userRepository.findOne({where:{email:email}})
        // const user= this.accountRepository.findOne({where:{email}})
    }
    
    async getAccountById(id:string): Promise<any> {
        return this.accountRepository.findOne({where:{id}})
    }
    async getAccountByEmail(email:string): Promise<any> {
        const result=await this.accountRepository.findOne({where:{email:email}})
        return result
    }

    // Application

    async getApplicationByUserId(userId: string): Promise<ApplicationResponse[]> {
        const result = await this.userRepository.find({ where: { id: userId }, relations: ['applications'] })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return UserResponse.fromEntity(result[0]).appliaction
    }
   
    async getArchivedApplication(): Promise<ApplicationResponse[]> {
        const queryBuilder = this.applicationRepository.createQueryBuilder('license_application')
        queryBuilder.withDeleted().where('license_application.deletedAt is not null')
        console.log(queryBuilder.getSql())
        const result= await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getArchivedApplicationById(userId): Promise<ApplicationResponse[]> {
        const queryBuilder = this.applicationRepository.createQueryBuilder('license_application')
        queryBuilder.withDeleted().where('license_application.deletedAt is not null').andWhere('license_application.userId=:userId',{userId})
        console.log(queryBuilder.getSql())
        const result= await queryBuilder.getMany()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element) => ApplicationResponse.fromEntity(element))
    }
    async getApplicationDetail(applicationId:string): Promise<ApplicationResponse> {
        console.log('result', applicationId)
        const result = await this.applicationRepository.findOne({ where: { id: applicationId } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return ApplicationResponse.fromEntity(result)
    }
    async getApplicationByStatus(status: string): Promise<ApplicationResponse[]> {
        const result = await this.applicationRepository.find({ where: { status: status } })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element)=>ApplicationResponse.fromEntity(element)) 
    }
    async getDelegationFileNameByUserId(userId:string,applicationId:string): Promise<string> {
        const result= await this.userRepository.find({where:{id:userId},relations:['applications']})
        console.log('rrrrrrrrrrrrrrrrrrrrrrrrr',result[0].applications)
        const application=result[0].applications.find((element)=>{return element.id==applicationId})
        return application.file;
    }
    async getApplications(): Promise<ApplicationResponse[]> {
        const result = await this.applicationRepository.find({relations:['user']})

        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element)=>ApplicationResponse.fromEntity(element))
    }
    // License
    async getLicenseByApplicationId(applicationId: string): Promise<ApplicationResponse> {
        const result = await this.applicationRepository.find({ where: { id: applicationId }, relations: ['license'] })
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return ApplicationResponse.fromEntity(result[0])
    }
    async getLicenseByStatus(status: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { status: status }})
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element)=>LicenseResponse.fromEntity(element))
    }
    async getLicenseByStatusByUserId(status: string,userId:string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { userId:userId,status: status }})
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element)=>LicenseResponse.fromEntity(element))
    }
    async getLicenseByUserId(userId: string): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find({ where: { userId: userId }})
        console.log('resultddddd', result)
        if (!result) {
            throw new NotFoundException(`Licenses not found`);
        }
        return result.map((element)=>LicenseResponse.fromEntity(element))
    }
    async getLicenses(): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Licenses   not found`);
        }
        return result.map((element)=>LicenseResponse.fromEntity(element))
    }
    async getExpiredLicenses(): Promise<LicenseResponse[]> {
        const result = await this.licenseRepository.find()
        console.log('result', result)
        if (!result) {
            throw new NotFoundException(`Archived users  not found`);
        }
        return result.map((element)=>LicenseResponse.fromEntity(element))
    }
}