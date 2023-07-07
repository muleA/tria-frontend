/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { IUserRepository } from "../domain/user/user.repository.interface";
import { Repository } from "typeorm";
import { User } from "../domain/user";
import { UserEntity } from "./user.entity";
import { Certificate } from "../domain/Certificate";
import { CertificateEntity } from "./certificate.entity";
import { LicenseApplication } from "../domain/licenseApplication";
import { LicenseApplicationEntity } from "./application.entity";
import { LicenseApplicantEducation } from "../domain/licenseApplicantEducation";
import { LicenseApplicantEducationEntity } from "./education.entity";
import { LicenseApplicantExperience } from "../domain/licenseApplicantExperience";
import { LicenseApplicantexperienceEntity } from "./experience.entity";
import { Logger } from "@nestjs/common";
import { CreateLicenseApllicantEducationCommand } from "../useCases/licenseApllicantEducation.commands";
import { AccountEntity } from "./accounts.entity";
import { UserAcount } from "../domain/account";
import { ExperienceResponses } from "../useCases/experience.responses ";
import { LicenseEntity } from "./License.entity";
import { License } from "../domain/License";


export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        @InjectRepository(LicenseApplicantEducationEntity)
        private educationRepository: Repository<LicenseApplicantEducationEntity>,
        @InjectRepository(LicenseApplicantEducationEntity)
        private expirianceRepository: Repository<LicenseApplicantEducationEntity>,
        @InjectRepository(CertificateEntity)
        private certificateRepository: Repository<CertificateEntity>
    ) {
        //  super()
    }
    async insertUser(user: User): Promise<User> {
        const userEntity = this.toUserEntity(user)
        console.log('going to the application ',userEntity.applications)
        const result = await this.userRepository.save(userEntity)
        console.log('after saving user the application entity is  ',result.applications)
        console.log('after saving user the application domain is  is  ',this.toUser(result).application)

        return result ? this.toUser(result) : null;
    }
    async saveUser(user: UserEntity): Promise<User> {
        // const userEntity = this.toUserEntity(user)
        // console.log('going to the application ',userEntity.applications)
        const result = await this.userRepository.save(user)
        // console.log('after saving user the application entity is  ',result.applications)
        // console.log('after saving user the application domain is  is  ',result.applications)

        return result ? this.toUser(result) : null;
    }
    async findAll(): Promise<User[]> {
        const result = await this.userRepository.find()
        return result ? result.map((element) => this.toUser(element)) : null
    }
    async findById(id: string): Promise<User> {
        try {
            const result=await this.userRepository.find({ where:{id: id},relations:['certificate','education','expiriance','applications','account','license'] })
            return this.toUser(result[0])
        } catch (error) {
            Logger.log(` User with Id ${id} is not found`)
        }
    }
    async finduserById(id: string): Promise<UserEntity> {
        try {
            const result=await this.userRepository.find({ where:{id: id},relations:['certificate','education','expiriance','applications','account','license'] })
            return result[0]
        } catch (error) {
            Logger.log(` User with Id ${id} is not found`)
        }
    }
    async updateUser(user: User): Promise<User> {
        const userEntity=this.toUserEntity(user)
        const result=await this.userRepository.save(userEntity)
        return result? this.toUser(result):null;
    }
    async updateExpiriance(user: LicenseApplicantExperience): Promise<LicenseApplicantExperience> {
        const userEntity=this.toExpirianceEntity(user)

        const result=await this.expirianceRepository.save(userEntity)

        return result? this.toExpiriance(result):null;
    }
    async deleteById(id: string): Promise<boolean> {
        const result = await this.userRepository.delete(id)
        if (result.affected > 0) return true;
        return false;
    }
    async softDeleteUser(userID: string): Promise<boolean> {
        // const userEntity=this.toUserEntity(user)
        const result= await this.userRepository.softDelete(userID)
        if (result.affected > 0) return true;
        return false;
    }
   async  restoreUser(userID: string): Promise<boolean> {
        const result=await this.userRepository.restore(userID)
        if (result.affected > 0) return true;
        return false;
    }
   

    // education start
    async  softDeleteEducation(educationID: string):Promise<boolean>{

        const result= await this.educationRepository.softDelete(educationID)
        if (result.affected > 0) return true;
        return false;
    }
    async  restoreEducation(educationID: string): Promise<boolean> {
        const result=await this.educationRepository.restore(educationID)
        if (result.affected > 0) return true;
        return false;
    }
    // educatione end
    private toUserEntity(user: User) {
        const userEntity: UserEntity = new UserEntity()
        userEntity.id = user?.id
        userEntity.accountId = user.accountId
        userEntity.firstName = user.firstName
        userEntity.middleName = user.middleName
        userEntity.lastName = user.lastName
        userEntity.lastName = user.lastName
        userEntity.gender = user.gender
        userEntity.email = user.email
        userEntity.phone = user.phone
        userEntity.subCity = user.subCity
        userEntity.wereda = user.wereda
        userEntity.kebele = user.kebele
        userEntity.city = user.city
        userEntity.profilePicture = user.profilePicture
        userEntity.houseNumber = user.houseNumber
        userEntity.createdAt = user.createdAt
        userEntity.createdBy = user.createdBy
        userEntity.deletedAt = user.deletedAt
        userEntity.deletedBy = user.deletedBy
        userEntity.updatedAt = user.updatedAt
        userEntity.updatedBy = user.updatedBy
        // userEntity.account=user.account?this.toAccountEntity(user.account):null
        userEntity.certificate = user?.certificate?.map((element) =>
            this.toCertificateEntity(element)
        )
        userEntity.applications = user?.application?.map((element) =>
            this.toApplicationEntity(element)
        )
        userEntity.education = user?.education?.map((element) =>
            this.toEducationEntity(element)
        )
        userEntity.expiriance = user?.expiriance?.map((element) =>
            this.toExpirianceEntity(element)
        )
        userEntity.license = user?.license?.map((element) =>
            this.toLicenseEntity(element)
        )
        console.log(' after user is   changed to entity',userEntity.applications)

        return userEntity;
    }
    private toUser(userEntity: UserEntity): User {
        // console.log('going to chnage to user domain   ',userEntity.applications)

        const user: User = new User()
        user.id = userEntity.id
        user.accountId = userEntity.accountId
        user.firstName = userEntity.firstName
        user.middleName = userEntity.middleName
        user.lastName = userEntity.lastName
        user.gender = userEntity.gender
        user.email = userEntity.email
        user.phone = userEntity.phone
        user.subCity = userEntity.subCity
        user.wereda = userEntity.wereda
        user.kebele = userEntity.kebele
        user.city = userEntity.city
        user.profilePicture = userEntity.profilePicture
        user.houseNumber = userEntity.houseNumber
        user.createdAt = userEntity.createdAt
        user.createdBy = userEntity.createdBy
        user.deletedAt = userEntity.deletedAt
        user.deletedBy = userEntity.deletedBy
        user.updatedAt = userEntity.updatedAt
        user.updatedBy = userEntity.updatedBy
        // user.account=userEntity.account?this.toAccount(userEntity.account):null
        user.certificate = userEntity?.certificate?.map((element) =>
            this.toCertificate(element)
        )
        user.education = userEntity?.education?.map((element) =>
            this.toEducation(element)
        )
        user.expiriance = userEntity?.expiriance?.map((element) =>
            this.toExpiriance(element)
        )
        // console.log(' user.applicationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ',userEntity?.applications?.map((element) =>
        //     this.toApplication(element)
        // ))
        user.application = userEntity?.applications?.map((element) =>
            this.toApplication(element)
        )
        // console.log(' user.applicationnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn ',user.application)
        
        // user.license = userEntity?.license?.map((element) =>
        //     this.toLicense(element)
        // )
        return user;
    }
    private toAccount(accountEntity: AccountEntity): UserAcount {
        const userAcount: UserAcount = new UserAcount()

        userAcount.id = accountEntity.id
        // userAcount.userId = accountEntity.userId
        userAcount.password = accountEntity.password
        userAcount.userName = accountEntity.userName
        userAcount.email = accountEntity.email
        userAcount.status = accountEntity.status
        userAcount.accountType = accountEntity.accountType
        
        userAcount.createdAt = accountEntity.createdAt
        userAcount.createdBy = accountEntity.createdBy
        userAcount.deletedAt = accountEntity.deletedAt
        userAcount.deletedBy = accountEntity.deletedBy
        userAcount.updatedAt = accountEntity.updatedAt
        userAcount.updatedBy = accountEntity.updatedBy
        return userAcount
    }
    private toAccountEntity(userAcount: UserAcount):  AccountEntity {
        const accountEntity: AccountEntity = new AccountEntity()

        accountEntity.id = userAcount.id
        // accountEntity.userId = userAcount.userId
        accountEntity.password = userAcount.password
        accountEntity.userName = userAcount.userName
        accountEntity.email = userAcount.email
        accountEntity.status = userAcount.status
        accountEntity.accountType = userAcount.accountType
        
        accountEntity.createdAt = userAcount.createdAt
        accountEntity.createdBy = userAcount.createdBy
        accountEntity.deletedAt = userAcount.deletedAt
        accountEntity.deletedBy = userAcount.deletedBy
        accountEntity.updatedAt = userAcount.updatedAt
        accountEntity.updatedBy = userAcount.updatedBy
        return accountEntity
    }
    private toCertificateEntity(certificate: Certificate): CertificateEntity {
        const certificateEntity: CertificateEntity = new CertificateEntity()

        certificateEntity.id = certificate.id
        certificateEntity.userId = certificate.userId
        certificateEntity.Institution = certificate.Institution
        certificateEntity.certificateTitle = certificate.certificateTitle
        certificateEntity.name = certificate.name
        certificateEntity.receivedDate = certificate.receivedDate
        certificateEntity.startDate = certificate.startDate
        certificateEntity.file = certificate?.file

        certificateEntity.updatedAt = certificate.updatedAt
        certificateEntity.updatedBy = certificate.updatedBy
        certificateEntity.createdAt = certificate.createdAt
        certificateEntity.createdBy = certificate.createdBy
        certificateEntity.deletedAt = certificate.deletedAt
        certificateEntity.deletedBy = certificate.deletedBy

        return certificateEntity
    }
    private toCertificate(certificateEntity: CertificateEntity): Certificate {
        const certificate: Certificate = new Certificate()

        certificate.id = certificateEntity.id
        certificate.userId = certificateEntity.userId
        certificate.Institution = certificateEntity.Institution
        certificate.certificateTitle = certificateEntity.certificateTitle
        certificate.name = certificateEntity.name
        certificate.receivedDate = certificateEntity.receivedDate
        certificate.startDate = certificateEntity.startDate
        certificate.file = certificateEntity.file

        certificate.updatedAt = certificateEntity.updatedAt
        certificate.updatedBy = certificateEntity.updatedBy
        certificate.createdAt = certificateEntity.createdAt
        certificate.createdBy = certificateEntity.createdBy
        certificate.deletedAt = certificateEntity.deletedAt
        certificate.deletedBy = certificateEntity.deletedBy

        return certificate
    }
    private toApplicationEntity(application: LicenseApplication): LicenseApplicationEntity {
        // console.log('application is going tobe changed to entity',application)
        const licenseApplicationEntity: LicenseApplicationEntity = new LicenseApplicationEntity()
        licenseApplicationEntity.id = application?.id
        licenseApplicationEntity.userId = application?.userId
        licenseApplicationEntity.licenseId = application?.licenseId
        licenseApplicationEntity.appointmentDate = application?.appointmentDate
        licenseApplicationEntity.applierType = application.applierType
        licenseApplicationEntity.applicationType = application.applicationType
        licenseApplicationEntity.applicationCategory = application.applicationCategory
        licenseApplicationEntity.status = application?.status
        licenseApplicationEntity.file = application?.file
        licenseApplicationEntity.delegationFile = application?.delegationFile
        licenseApplicationEntity.comment = application?.comment
        licenseApplicationEntity.facilityName= application?.facilityName
        licenseApplicationEntity.state= application?.state
        licenseApplicationEntity.subCity= application?.subCity  
        licenseApplicationEntity. woreda= application?.woreda  
        licenseApplicationEntity.kebele= application?.kebele
        licenseApplicationEntity.houseNumber= application?.houseNumber
        licenseApplicationEntity.phone= application?.phone
        licenseApplicationEntity.ownerName= application?.ownerName
        licenseApplicationEntity.lastName= application?.lastName
        licenseApplicationEntity.professionalName= application?.professionalName
        licenseApplicationEntity.professionalLastName= application?.professionalLastName
        licenseApplicationEntity.qualificationLevel= application?.qualificationLevel
        licenseApplicationEntity.professionalLicenseNumber= application?.professionalLicenseNumber
        licenseApplicationEntity.educationId = application?.educationId
        licenseApplicationEntity.experienceId = application?.experienceId
        licenseApplicationEntity.certificateId = application?.certificateId
        // licenseApplicationEntity.user = this.toUserEntity(application.user)
        // licenseApplicationEntity.license = this.toLicenseEntity(application?.license)
        // console.log('application is have been changed to entity',licenseApplicationEntity)
        licenseApplicationEntity.createdAt = application.createdAt
        licenseApplicationEntity.createdBy = application.createdBy
        licenseApplicationEntity.deletedAt = application.deletedAt
        licenseApplicationEntity.deletedBy = application.deletedBy
        licenseApplicationEntity.updatedAt = application.updatedAt
        licenseApplicationEntity.updatedBy = application.updatedBy
        return licenseApplicationEntity;
    }
    private toApplication(applicationEntity: LicenseApplicationEntity): LicenseApplication {
        const application: LicenseApplication = new LicenseApplication()
        // console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff the application entity is ',applicationEntity)
        application.id = applicationEntity.id
        application.userId = applicationEntity?.userId
        application.licenseId = applicationEntity?.licenseId
        application.appointmentDate = applicationEntity?.appointmentDate
        application.applicationType = applicationEntity.applicationType
        application.applicationCategory = applicationEntity.applicationCategory
        application.applierType = applicationEntity.applierType
        application.status = applicationEntity?.status
        application.file = applicationEntity?.file
        application.delegationFile = applicationEntity?.delegationFile
        application.comment = applicationEntity?.comment
        // application.license = this.toLicense(applicationEntity.license)
        application.educationId = applicationEntity?.educationId
        application.experienceId = applicationEntity?.experienceId
        application.certificateId = applicationEntity?.certificateId
        // application.user = this.toUser(applicationEntity.user)
        // console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa the application domain is ',application)

        application.facilityName= applicationEntity?.facilityName
        application.state= applicationEntity?.state
        application.subCity= applicationEntity?.subCity  
        application. woreda= applicationEntity?.woreda  
        application.kebele= applicationEntity?.kebele
        application.houseNumber= applicationEntity?.houseNumber
        application.phone= applicationEntity?.phone
        application.ownerName= applicationEntity?.ownerName
        application.lastName= applicationEntity?.lastName
        application.professionalName= applicationEntity?.professionalName
        application.professionalLastName= applicationEntity?.professionalLastName
        application.qualificationLevel= applicationEntity?.qualificationLevel
        application.professionalLicenseNumber= applicationEntity?.professionalLicenseNumber

        application.createdAt = applicationEntity.createdAt
        application.createdBy = applicationEntity.createdBy
        application.deletedAt = applicationEntity.deletedAt
        application.deletedBy = applicationEntity.deletedBy
        application.updatedAt = applicationEntity.updatedAt
        application.updatedBy = applicationEntity.updatedBy
        // console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr the application domain is ',application)
        
        return application;
    }
    private toEducationEntity(education: LicenseApplicantEducation): LicenseApplicantEducationEntity {
        const licenseApplicantEducationEntity: LicenseApplicantEducationEntity = new LicenseApplicantEducationEntity()

        licenseApplicantEducationEntity.id = education?.id
        licenseApplicantEducationEntity.userId = education.userId
        licenseApplicantEducationEntity.Institution = education.Institution
        licenseApplicantEducationEntity.file = education.file
        licenseApplicantEducationEntity.professionalTitle = education.professionalTitle
        licenseApplicantEducationEntity.fieldOfStudy = education.fieldOfStudy
        licenseApplicantEducationEntity.receivedDate = education.receivedDate
        licenseApplicantEducationEntity.studentIdNumber = education.studentIdNumber

        licenseApplicantEducationEntity.createdAt = education.createdAt
        licenseApplicantEducationEntity.createdBy = education.createdBy
        licenseApplicantEducationEntity.deletedAt = education.deletedAt
        licenseApplicantEducationEntity.deletedBy = education.deletedBy
        licenseApplicantEducationEntity.updatedAt = education.updatedAt
        licenseApplicantEducationEntity.updatedBy = education.updatedBy
        return licenseApplicantEducationEntity;
    }
    private toEducation(education: LicenseApplicantEducationEntity): LicenseApplicantEducation {
        const licenseApplicantEducation: LicenseApplicantEducation = new LicenseApplicantEducation()

        licenseApplicantEducation.id = education.id
        licenseApplicantEducation.userId=education.userId
        licenseApplicantEducation.Institution=education.Institution
        licenseApplicantEducation.professionalTitle = education?.professionalTitle
        licenseApplicantEducation.fieldOfStudy = education?.fieldOfStudy
        licenseApplicantEducation.receivedDate = education?.receivedDate
        licenseApplicantEducation.studentIdNumber = education?.studentIdNumber
        licenseApplicantEducation.file = education?.file

        licenseApplicantEducation.createdAt = education.createdAt
        licenseApplicantEducation.createdBy = education.createdBy
        licenseApplicantEducation.deletedAt = education.deletedAt
        licenseApplicantEducation.deletedBy = education.deletedBy
        licenseApplicantEducation.updatedAt = education.updatedAt
        licenseApplicantEducation.updatedBy = education.updatedBy
        // licenseApplicantEducation.user = this.toUser(education.user)
        return licenseApplicantEducation;
    }
    private toExpirianceEntity(expiriance: LicenseApplicantExperience): LicenseApplicantexperienceEntity {

        const licenseApplicantexperienceEntity: LicenseApplicantexperienceEntity = new LicenseApplicantexperienceEntity()
        licenseApplicantexperienceEntity.id = expiriance.id
        licenseApplicantexperienceEntity.userId = expiriance.userId
        licenseApplicantexperienceEntity.file = expiriance.file
        licenseApplicantexperienceEntity.kebela = expiriance.kebela
        licenseApplicantexperienceEntity.organizationName = expiriance.organizationName
        licenseApplicantexperienceEntity.subCity = expiriance.subCity
        licenseApplicantexperienceEntity.tin = expiriance.tin
        licenseApplicantexperienceEntity.woreda = expiriance.woreda

        licenseApplicantexperienceEntity.createdAt = expiriance.createdAt
        licenseApplicantexperienceEntity.createdBy = expiriance.createdBy
        licenseApplicantexperienceEntity.updatedAt = expiriance.updatedAt
        licenseApplicantexperienceEntity.updatedBy = expiriance.updatedBy
        licenseApplicantexperienceEntity.deletedAt = expiriance.deletedAt
        licenseApplicantexperienceEntity.deletedBy = expiriance.deletedBy
        // licenseApplicantexperienceEntity.user = expiriance.user?this.toUserEntity(expiriance.user):null

        return licenseApplicantexperienceEntity
    }
    private toExpiriance(expirianceEntity: LicenseApplicantexperienceEntity): LicenseApplicantExperience {

        const licenseApplicantexperience: LicenseApplicantExperience = new LicenseApplicantExperience()
        licenseApplicantexperience.id = expirianceEntity?.id
        licenseApplicantexperience.userId = expirianceEntity.userId
        licenseApplicantexperience.file = expirianceEntity?.file
        licenseApplicantexperience.woreda = expirianceEntity.woreda
        licenseApplicantexperience.kebela = expirianceEntity.kebela
        licenseApplicantexperience.organizationName = expirianceEntity.organizationName
        licenseApplicantexperience.subCity = expirianceEntity.subCity
        licenseApplicantexperience.tin = expirianceEntity.tin
        
        // licenseApplicantexperience.user = this.toUser(expirianceEntity.user)

        licenseApplicantexperience.createdAt = expirianceEntity.createdAt
        licenseApplicantexperience.createdBy = expirianceEntity.createdBy
        licenseApplicantexperience.deletedAt = expirianceEntity.deletedAt
        licenseApplicantexperience.deletedBy = expirianceEntity.deletedBy
        licenseApplicantexperience.updatedAt = expirianceEntity.updatedAt
        licenseApplicantexperience.updatedBy = expirianceEntity.updatedBy

        return licenseApplicantexperience
    }

    private toLicenseEntity(license: License): LicenseEntity {

        const licenseEntity: LicenseEntity = new LicenseEntity()
        licenseEntity.id = license.id
        licenseEntity.issuedBy = license.issuedBy
        licenseEntity.licenseNumber = license.licenseNumber
        licenseEntity.validFrom = license.validFrom
        licenseEntity.validTo = license.validTo
        licenseEntity.userId = license.userId
        licenseEntity.status = license.status
        licenseEntity.comment = license.comment

        licenseEntity.createdAt = license.createdAt
        licenseEntity.createdBy = license.createdBy
        licenseEntity.updatedAt = license.updatedAt
        licenseEntity.updatedBy = license.updatedBy
        licenseEntity.deletedAt = license.deletedAt
        licenseEntity.deletedBy = license.deletedBy
        // licenseEntity.user = expiriance.user?this.toUserEntity(expiriance.user):null

        return licenseEntity
    }
    private toLicense(licenseEntity: LicenseEntity): License {

        const license: License = new License()
        license.id = licenseEntity?.id
        license.licenseNumber = licenseEntity?.licenseNumber
        license.issuedBy = licenseEntity?.issuedBy
        license.validFrom = licenseEntity.validFrom
        license.validTo = licenseEntity.validTo
        license.userId = licenseEntity.userId
        license.status = licenseEntity.status
        license.comment = licenseEntity.comment
        
        // license.user = this.toUser(licenseEntity.user)

        license.createdAt = licenseEntity.createdAt
        license.createdBy = licenseEntity.createdBy
        license.deletedAt = licenseEntity.deletedAt
        license.deletedBy = licenseEntity.deletedBy
        license.updatedAt = licenseEntity.updatedAt
        license.updatedBy = licenseEntity.updatedBy

        return license
    }
    
}