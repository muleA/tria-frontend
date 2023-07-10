/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, Post, Param, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LicenseApplicantExperience } from 'src/registration/domain/licenseApplicantExperience';
import { CreateAccountCommand, UpdateAccountCommand } from 'src/registration/useCases/account.command';
import { AccountResponse } from 'src/registration/useCases/account.response';
import { ExperienceResponses } from 'src/registration/useCases/experience.responses ';
import { CreateLicenseApllicantEducationCommand, UpdateEducationCommand } from 'src/registration/useCases/licenseApllicantEducation.commands';
import { CreateLicenseApplicantExperienceCommand, UpdateExperienceCommand } from 'src/registration/useCases/licenseApplicantExperience.command';
import { CreateUserCommand, UpdateUserCommand } from 'src/registration/useCases/user.command';
import { UserResponse } from 'src/registration/useCases/user.responses';
import { UserQueries } from 'src/registration/useCases/users.usecase.queries';
import { UserCommand } from 'src/registration/useCases/users.usecases.command';
import { diskStorage } from "multer";
import { EducationResponse } from 'src/registration/useCases/education.response';
import { CertificateResponse } from 'src/registration/useCases/certificate.response';
import { CreateCertificateCommand, UpdateCertificateCommand } from 'src/registration/useCases/Certificate.commands';
import { ApplicationResponse } from 'src/registration/useCases/applicatopn.response';
import { ChangeApplicationStatusCommand, CreateApplicationCommand, CreateHealthFacilityApplicationCommand, UpdateHealthFacilityApplicationCommand } from 'src/registration/useCases/application.command';
import { LicenseResponse } from 'src/registration/useCases/License.response';
import { CreateLicenseCommand } from 'src/registration/useCases/license.command';
import * as path from 'path';
import * as fs from 'fs';
@Controller('user')
@ApiTags('User')
export class UserController {
    constructor(
        private commands: UserCommand,
        private queries: UserQueries
    ) {
    }


    /**
     * a method that fetches all  users 
     * @returns list of users
     * 
     */
    @Get("get-users")
    @ApiOkResponse({ type: UserResponse })
    async getUser() {
        return await this.queries.fecthUser()
    }

    /**
 * a method that fetches all  users 
 * @returns list of users
 * 
 */
    @Get("get-user/:userId")
    @ApiOkResponse({ type: UserResponse })
    async getUserByUserId(@Param('userId') userId: string) {
        return await this.queries.getUserByUserId(userId)
    }
    @Get("get-archived-users")
    @ApiOkResponse({ type: UserResponse })
    async getArchivedUser() {
        return await this.queries.getArchivedUser()
    }
    /**
     * a method used to create user   
     * @param createUserCommand 
     * @returns the created user Entity after saving it to the  database
     */
    @Post("create-user")
    @ApiOkResponse({ type: UserResponse })
    async createUser(
        @Body() createUserCommand: CreateUserCommand
    ) {
        console.log(createUserCommand)
        return await this.commands.createUser(createUserCommand);
    }
    @Post("archive-user/:userId")
    @ApiOkResponse({ type: Boolean })
    async archiveUserByUserId(@Param('userId') userId: string) {
        return await this.commands.archiveUser(userId)
    }
    @Post("restore-user/:userId")
    @ApiOkResponse({ type: Boolean })
    async restoreUserByUserId(@Param('userId') userId: string) {
        return await this.commands.unArchiveUser(userId)
    }
    @Post("delete-user/:userId")
    @ApiOkResponse({ type: Boolean })
    async deleteUserByUserId(@Param('userId') userId: string) {
        return await this.commands.deleteUser(userId)
    }
    @Post("update-user")
    @ApiOkResponse({ type: UserResponse })
    async updateUser(@Body() updateUserCommand: UpdateUserCommand) {
        return await this.commands.updateUser(updateUserCommand)
    }
    /**
     * Service Related to Education
     */
    @Post("add-education-to-user")
    @ApiOkResponse({ type: EducationResponse })
    async addEducationToUser(@Body() createLicenseApllicantEducationCommand: CreateLicenseApllicantEducationCommand) {
        return await this.commands.createEducation(createLicenseApllicantEducationCommand)
    }

    @Post("soft-delete-education/:educationId")
    @ApiOkResponse({ type: Boolean })
    async softDeleteEducation(@Param('educationId') educationId: string) {
        return await this.commands.archiveEducation(educationId)
    }
    @Post("restore-education/:educationId")
    @ApiOkResponse({ type: Boolean })
    async restoreEducation(@Param('educationId') educationId: string) {
        return await this.commands.unArchiveEducation(educationId)
    }
    @Post("delete-education/:educationId")
    @ApiOkResponse({ type: Boolean })
    async deleteEducation(@Param('educationId') educationId: string) {
        return await this.commands.deleteEducation(educationId)
    }
    @Post("update-education")
    @ApiOkResponse({ type: EducationResponse })
    async updateEducation(@Body() updateEducationCommand: UpdateEducationCommand) {
        return await this.commands.updateEducation(updateEducationCommand)
    }
    @Get("get-archived-educationsby-userId/:userId")
    @ApiOkResponse({ type: EducationResponse })
    async getArchivedEducations(@Param('userId') userId: string) {
        return await this.queries.getArchivedEducations(userId)
    }
    @Get("get-education-by-userId/:userId")
    @ApiOkResponse({ type: EducationResponse })
    async getEducationByUserId(@Param('userId') userId: string) {
        return await this.queries.getEducationByUserId(userId)
    }
    @Get("get-education-by-educationId/:educationId")
    @ApiOkResponse({ type: EducationResponse })
    async getEducationByEducationId(@Param('educationId') educationId: string) {
        return await this.queries.getEducationByEducationId(educationId)
    }
    @Get("get-educations")
    @ApiOkResponse({ type: EducationResponse })
    async getEducations() {
        return await this.queries.getEducations()
    }
    /**
     * Service Related to Certificate  
     */
    @Post("add-certificate-to-user")
    @ApiOkResponse({ type: CertificateResponse })
    async addCertificateToUser(@Body() createCertificateCommand: CreateCertificateCommand) {
        return await this.commands.createCertificate(createCertificateCommand)
    }

    @Post("soft-delete-certificate/:certificateId")
    @ApiOkResponse({ type: Boolean })
    async softDeleteCertificate(@Param('certificateId') certificateId: string) {
        return await this.commands.archiveCertificate(certificateId)
    }
    @Post("restore-certificate/:certificateId")
    @ApiOkResponse({ type: Boolean })
    async restoreCertificate(@Param('certificateId') certificateId: string) {
        return await this.commands.unArchiveCertificate(certificateId)
    }
    @Post("delete-certificate/:certificateId")
    @ApiOkResponse({ type: Boolean })
    async deleteCertificate(@Param('certificateId') certificateId: string) {
        return await this.commands.deleteCertificate(certificateId)
    }
    @Post("update-certificate")
    @ApiOkResponse({ type: CertificateResponse })
    async updateCertificate(@Body() updateCertificateCommand: UpdateCertificateCommand) {
        return await this.commands.updateCertificate(updateCertificateCommand)
    }
    @Get("get-archived-certificate-by-userId/:userId")
    @ApiOkResponse({ type: CertificateResponse })
    async getArchivedCertificateByUserID(@Param('userId') userId: string) {
        return await this.queries.getArchivedCertificate(userId)
    }
    @Get("get-certificate-by-userId/:userId")
    @ApiOkResponse({ type: CertificateResponse })
    async getCertificateByUserId(@Param('userId') userId: string) {
        return await this.queries.getCertificateByUserId(userId)
    }
    @Get("get-certificate-by-certificateId/:certificateId")
    @ApiOkResponse({ type: CertificateResponse })
    async geCertificate(@Param('certificateId') certificateId: string) {
        return await this.queries.getCertificate(certificateId)
    }
    @Get("get-certificates")
    @ApiOkResponse({ type: EducationResponse })
    async getCertificates() {
        return await this.queries.getCertificates()
    }
    /**
       * Service Related to Expiriance
       */
    @Post("add-experience-to-user")
    @ApiOkResponse({ type: LicenseApplicantExperience })
    async addExperienceToUser(@Body() createLicenseApplicantExperienceCommand: CreateLicenseApplicantExperienceCommand) {
        return await this.commands.createExperience(createLicenseApplicantExperienceCommand)
    }

    @Post("soft-delete-experience/:experienceId")
    @ApiOkResponse({ type: Boolean })
    async softDeleteExperience(@Param('experienceId') experienceId: string) {
        return await this.commands.archiveExperience(experienceId)
    }
    @Post("restore-experience/:experienceId")
    @ApiOkResponse({ type: Boolean })
    async restoreExperience(@Param('experienceId') experienceId: string) {
        return await this.commands.unArchiveExperience(experienceId)
    }
    @Post("delete-experience/:educationId")
    @ApiOkResponse({ type: Boolean })
    async deleteExperience(@Param('experienceId') experienceId: string) {
        return await this.commands.deleteExperience(experienceId)
    }
    @Post("update-experience")
    @ApiOkResponse({ type: ExperienceResponses })
    async updateExperience(@Body() updateExperienceCommand: UpdateExperienceCommand) {
        return await this.commands.updateExperience(updateExperienceCommand)
    }
    @Get("get-archived-experience-by-userId/:userId")
    @ApiOkResponse({ type: ExperienceResponses })
    async getArchivedExperienceByUserID(@Param('userId') userId: string) {
        return await this.queries.getArchivedExpiriance(userId)
    }
    @Get("get-experience-by-userId/:userId")
    @ApiOkResponse({ type: ExperienceResponses })
    async getExperienceByUserId(@Param('userId') userId: string) {
        return await this.queries.getExpirianceByUserId(userId)
    }
    @Get("get-experience-by-expirianceId/:expirianceId")
    @ApiOkResponse({ type: ExperienceResponses })
    async getExperienceById(@Param('expirianceId') expirianceId: string) {
        return await this.queries.getExpirianceById(expirianceId)
    }
    @Get("get-experiences")
    @ApiOkResponse({ type: EducationResponse })
    async getExperience() {
        return await this.queries.getExperiences()
    }
    // @Get("get-experiences-by-userId/:userId")
    // @ApiOkResponse({ type: ExperienceResponses })
    // async getExperiences(@Param('experienceId') userId: string) {
    //     return await this.queries.getExpiriances(userId)
    // }
    /**
     * Service Related to Account
     */
    @Post("create-account")
    @ApiOkResponse({ type: AccountResponse })
    async addAccountToUser(@Body() createAccountCommand: CreateAccountCommand) {
        return await this.commands.createAccount(createAccountCommand)
    }

    @Post("Disable-account/:accountId")
    @ApiOkResponse({ type: Boolean })
    async softDeleteAccount(@Param('experienceId') accountId: string) {
        return await this.commands.archiveAccount(accountId)
    }
    @Post("restore-account/:accountId")
    @ApiOkResponse({ type: Boolean })
    async restoreAccount(@Param('accountId') accountId: string) {
        return await this.commands.unArchiveAccount(accountId)
    }
    @Post("Remove-account/:accountId")
    @ApiOkResponse({ type: Boolean })
    async deleteAccount(@Param('accountId') accountId: string) {
        return await this.commands.deleteAccount(accountId)
    }
    @Post("update-account")
    @ApiOkResponse({ type: AccountResponse })
    async updateAccount(@Body() updateAccountCommand: UpdateAccountCommand) {
        return await this.commands.updateAccount(updateAccountCommand)
    }
    @Get("get-archived-account-by-userId/:accountuserId")
    @ApiOkResponse({ type: AccountResponse })
    async getArchivedAccountByUserID(@Param('accountuserId') accountuserId: string) {
        return await this.queries.getArchivedAccountByUserId(accountuserId)
    }
    @Get("get-account-by-userId/:accountId")
    @ApiOkResponse({ type: AccountResponse })
    async getAccountByUserId(@Param('accountId') accountId: string) {
        return await this.queries.getAccountByUserId(accountId)
    }
    @Get("get-accounts-by-credentials/:userName/:password")
    @ApiOkResponse({ type: AccountResponse })
    async getAccountsByCredentials(@Param('userName') userName: string, @Param('password') password: string) {
        return await this.queries.getUserIdBycredentials(userName, password)
    }
    @Get("get-accounts-by-userId/:userId")
    @ApiOkResponse({ type: AccountResponse })
    async getAccounts(@Param('userId') userId: string) {
        return await this.queries.getAccounts(userId)
    }
    @Get("get-user-by-email/:email")
    @ApiOkResponse({ type: AccountResponse })
    async getUserByEmail(@Param('email') email: string) {
        return await this.queries.getUserByEmail(email)
    }
    @Get("get-account-by-email/:email")
    @ApiOkResponse({ type: AccountResponse })
    async getAccountByEmail(@Param('email') email: string) {
        return await this.queries.getAccountByEmail(email)

    }

    // upload file
    @Post("add-education-attachment/:educationId/:userId")
    @ApiOkResponse({ type: EducationResponse })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                // educationId: { type: "string" },
                // title: { type: "string" },
                attachmentUrl: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("attachmentUrl", {
            storage: diskStorage({
                destination: './uploads/education',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    // const ext = extname(file.originalname);
                    const filename = `${uniqueSuffix}-${file.originalname}`;
                    callback(null, filename)
                },
            })
            // limits: { fileSize: Math.pow(2024, 2) },
        })
    )
    async addEducationAttachment(
        @Param('userId') userId: string,
        @Param('educationId') educationId: string,
        @UploadedFile() attachmentUrl: Express.Multer.File,
    ): Promise<any> {
        if (attachmentUrl) {
            const result = await this.commands.uploadEducationFile(String(attachmentUrl.filename).trim(), userId, educationId);
            return result
        }
    }

    //expiriance attachement
    @Post("add-experience-attachment/:experienceId/:userId")
    @ApiOkResponse({ type: ExperienceResponses })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                attachmentUrl: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("attachmentUrl", {
            storage: diskStorage({
                destination: './uploads/experience',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    // const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}`;
                    callback(null, filename)
                },
            })
            // limits: { fileSize: Math.pow(2024, 2) },
        })
    )
    async addExperienceAttachment(
        @Param('userId') userId: string,
        @Param('experienceId') experienceId: string,
        @UploadedFile() attachmentUrl: Express.Multer.File,
    ): Promise<any> {
        if (attachmentUrl) {
            const result = this.commands.uploadExperienceFile(attachmentUrl.filename, userId, experienceId);
            return result;

        }
    }

    //expiriance Certificate 
    @Post("add-certificate-attachment/:certificateId/:userId")
    @ApiOkResponse({ type: CertificateResponse })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                attachmentUrl: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("attachmentUrl", {
            storage: diskStorage({
                destination: './uploads/certificate',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    // const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}`;
                    callback(null, filename)
                },
            })
            // limits: { fileSize: Math.pow(2024, 2) },
        })
    )
    async addCertificateAttachment(
        @Param('userId') userId: string,
        @Param('certificateId') certificateId: string,
        @UploadedFile() attachmentUrl: Express.Multer.File,
    ): Promise<any> {
        if (attachmentUrl) {
            const result = this.commands.uploadCertificateFile(attachmentUrl.filename, userId, certificateId);
            return result;

        }
    }
    // Get Uploaded Files 
    @Get("get-education-file-name-by-userId/:userId/:educationId")
    @ApiOkResponse({ type: String })
    async getEducationFileNameByUserId(@Param('userId') userId: string, @Param('educationId') educationId: string) {
        return await this.queries.getEducationFileNameByUserId(userId, educationId)
    }
    @Get('get-education-file-by-name/:fileName')
    async getEducationFile(
        @Param("fileName") fileName: string,
        @Res() res
    ) {
        console.log('the fileName is :', fileName)
        res.download(`./uploads/education/${fileName}`)
    }

    // @Get("get-education-file-by-userId/:userId/:educationId")
    // @ApiOkResponse({ type: AccountResponse })
    // async getEducationFileByUserId( @Param('userId') userId: string,@Param('educationId') educationId: string) {
    //     return await this.queries.getEducationFileByUserId(userId,educationId)
    // }
    @Get("get-experience-file-name-by-userId/:userId/:experienceId")
    @ApiOkResponse({ type: String })
    async getExperienceFileNameByUserId(@Param('userId') userId: string, @Param('experienceId') experienceId: string) {
        return await this.queries.getExperienceFileNameByUserId(userId, experienceId)
    }
    @Get('get-experience-file-by-name/:fileName')
    async getExperienceFile(
        @Param("fileName") fileName: string,
        @Res() res
    ) {
        // return res.sendFile(fileName, { root: "./uploads/experience" });
        console.log('the fileName is :', fileName)
        res.download(`./uploads/experience/${fileName}`)
    }
    @Get("get-certificate-file-name-by-userId/:userId/:certificateId")
    @ApiOkResponse({ type: String })
    async getCertificateFileNameByUserId(@Param('userId') userId: string, @Param('certificateId') certificateId: string) {
        return await this.queries.getCertificateFileNameByUserId(userId, certificateId)
    }
    @Get('get-certificate-file-by-name/:fileName')
    async getCertificateFile(
        @Param("fileName") fileName: string,
        @Res() res
    ) {
        console.log('the fileName is :', fileName)
        res.download(`./uploads/certificate/${fileName}`)
    }
    // @Get("get-experience-file-by-userId/:userId/:experienceId")
    // @ApiOkResponse({ type: AccountResponse })
    // async getExperienceFileByUserId(@Param('userId') userId: string,@Param('experienceId') experienceId: string) {
    //     return await this.queries.getExperienceFileByUserId(userId,experienceId)
    // }
    // @Get("get-certificate-file-by-userId/:userId/:certificateId")
    // @ApiOkResponse({ type: AccountResponse })
    // async getUsergetCertificateFileByUserIdBy(@Param('userId') userId: string,@Param('certificateId') certificateId: string) {
    //     return await this.queries.getUsergetCertificateFileByUserIdByEmail(userId,certificateId)
    // }
    // Applications 
    @Post("add-applicationToUser/:userId")
    @ApiOkResponse({ type: ApplicationResponse })
    async addApplicationToUser(
        @Body() createApplicationCommand: CreateHealthFacilityApplicationCommand,
        @Param('userId') userId: string) {
        return await this.commands.createApplication(createApplicationCommand, userId)
    }
    @Post("update-application")
    @ApiOkResponse({ type: ApplicationResponse })
    async updateApplication(
        @Body() updateApplicationCommand: UpdateHealthFacilityApplicationCommand) {
        return await this.commands.updateApplication(updateApplicationCommand)
    }
    @Get("get-archived-application")
    @ApiOkResponse({ type: UserResponse })
    async getArchivedApplication() {
        return await this.queries.getArchivedApplication()
    }
    @Get("get-archived-application-by-userId/:userId")
    @ApiOkResponse({ type: UserResponse })
    async getArchivedApplicationByUserId(
        @Param('userId') userId: string
    ) {
        return await this.queries.getArchivedApplicationById(userId)
    }
    @Post("archive-application/:applicationId")
    @ApiOkResponse({ type: Boolean })
    async archiveApplicationByApplicationId(@Param('applicationId') applicationId: string) {
        return await this.commands.archiveApplication(applicationId)
    }
    @Post("restore-application/:applicationId")
    @ApiOkResponse({ type: Boolean })
    async restoreApplicationByApplicationId(@Param('applicationId') applicationId: string) {
        return await this.commands.unArchiveApplication(applicationId)
    }
    @Get("get-application-by-userId/:userId")
    @ApiOkResponse({ type: ApplicationResponse })
    async getApplicationByUserId(@Param('userId') userId: string) {
        return await this.queries.getApplicationByUserId(userId)
    }
    @Get("get-application-by-userId/:userId/:status")
    @ApiOkResponse({ type: ApplicationResponse })
    async getApplicationByUserIdByStatus(@Param('userId') userId: string, @Param('status') status: string) {
        return await this.queries.getLicenseByStatusByUserId(userId, status)
    }
    @Get("get-application-detail/:applicationId")
    @ApiOkResponse({ type: ApplicationResponse })
    async getApplicationDetail(@Param('applicationId') applicationId: string) {
        console.log('applicationId', applicationId)

        return await this.queries.getApplicationDetail(applicationId)
    }
    @Get("get-application-by-status/:status")
    @ApiOkResponse({ type: ApplicationResponse })
    async getApplicationByStatus(@Param('status') status: string) {
        return await this.queries.getApplicationByStatus(status)
    }
    @Post("change-application-status-By-applicationId/:applicationId")
    @ApiOkResponse({ type: ApplicationResponse })
    async approveApplicationByUserID(
        @Body() changeApplicationStatus: ChangeApplicationStatusCommand,
        @Param('applicationId') applicationId: string) {
        return await this.commands.changeApplicationStatus(changeApplicationStatus, applicationId)
    }
    @Post("give-application-appointment-By-applicationId/:applicationId/:appointmentDate")
    @ApiOkResponse({ type: ApplicationResponse })
    async giveApplicationAppointmentByUserID(
        @Body() changeApplicationStatus: ChangeApplicationStatusCommand,
        @Param('applicationId') applicationId: string,
        @Param('appointmentDate') appointmentDate: Date) {
        return await this.commands.giveAppointment(appointmentDate, applicationId)
    }
    @Get("get-applications")
    @ApiOkResponse({ type: ApplicationResponse })
    async getApplications() {
        return await this.queries.getApplications()
    }
    // License 
    @Post("add-licenseToApplication/:applicationId")
    @ApiOkResponse({ type: LicenseResponse })
    async addlicenseToApplication(
        @Body() createApplicationCommand: CreateLicenseCommand,
        @Param('applicationId') applicationId: string) {
        return await this.commands.createLicense(createApplicationCommand, applicationId)
    }
    @Get("get-license-by-licenseId/:licenseId")
    @ApiOkResponse({ type: ApplicationResponse })
    async getLicenseById(@Param('licenseId') licenseId: string) {
        return await this.queries.getLicenseById(licenseId)
    }
    @Get("get-license-by-applicationId/:applicationId")
    @ApiOkResponse({ type: ApplicationResponse })
    async getLicenseByApplicationId(@Param('applicationId') applicationId: string) {
        return await this.queries.getLicenseByApplicationId(applicationId)
    }
    @Get("get-license-by-status/:status")
    @ApiOkResponse({ type: LicenseResponse })
    async getLicenseByStatus(@Param('status') status: string) {
        return await this.queries.getLicenseByStatus(status)
    }
    @Get("get-license-by-userId/:userId")
    @ApiOkResponse({ type: LicenseResponse })
    async getLicenseByUserId(@Param('userId') userId: string) {
        return await this.queries.getLicenseByUserId(userId)
    }
    @Get("get-licenses")
    @ApiOkResponse({ type: LicenseResponse })
    async getLicense() {
        return await this.queries.getLicenses()
    }
    @Post("Change-license-status-by-licenseId/:licenseId/:status")
    @ApiOkResponse({ type: LicenseResponse })
    async ChangeLicenseStatusByLicenseId(
        @Param('licenseId') licenseId: string,
        @Param('status') status: string
    ) {
        return await this.commands.ChangeLicenseStatus(licenseId, status)
    }
    @Get("get-expired-licenses")
    @ApiOkResponse({ type: LicenseResponse })
    async getExpiredLicenses() {
        return await this.queries.getExpiredLicenses()
    }
    // upload Delegation attachment
    @Post("add-delegation-attachment/:applicationId/:userId")
    @ApiOkResponse({ type: ApplicationResponse })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                attachmentUrl: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("attachmentUrl", {
            storage: diskStorage({
                destination: './uploads/delegation',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    // const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}`;
                    callback(null, filename)
                },
            })
            // limits: { fileSize: Math.pow(2024, 2) },
        })
    )
    async addDelegationAttachment(
        @Param('applicationId') applicationId: string,
        @Param('userId') userId: string,
        @UploadedFile() attachmentUrl: Express.Multer.File,
    ): Promise<any> {
        if (attachmentUrl) {
            const result = await this.commands.uploadDelegationFile(String(attachmentUrl.filename).trim(), userId, applicationId);
            return result
        }
    }

    @Get("get-delegation-file-name-by-userId/:userId/:applicationId")
    @ApiOkResponse({ type: String })
    async getDelegationIdFileNameByUserId(@Param('userId') userId: string, @Param('applicationId') applicationId: string) {
        return await this.queries.getDelegationFileNameByUserId(userId, applicationId)
    }
    @Get('get-delegation-file-by-name/:fileName')
    async getDelegationFile(
        @Param("fileName") fileName: string,
        @Res() res
    ) {
        // return res.sendFile(fileName, { root: "./uploads/delegation" });
        console.log('the fileName is :', fileName)
        res.download(`./uploads/delegation/${fileName}`)
        

    }
    @Get('get-delegation-attachment-by-name/:fileName')
    async getFile(@Param('fileName') fileName: string, @Res() res): Promise<any> {
        const filePath = `./uploads/delegation/${fileName}`;
        if (!fs.existsSync(filePath)) {
            return res.status(404).send('File not found');
        }

        // Set the appropriate headers for file rendering
        const fileExtension = fileName.split('.').pop();
        const contentType = this.getContentType(fileExtension);
        res.setHeader('Content-Type', contentType);

        // Stream the file content to the response
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    }
    private getContentType(fileExtension: string): string {
        switch (fileExtension) {
            case 'pdf':
                return 'application/pdf';
            case 'doc':
            case 'docx':
                return 'application/msword';
            case 'xls':
            case 'xlsx':
                return 'application/vnd.ms-excel';
            case 'ppt':
            case 'pptx':
                return 'application/vnd.ms-powerpoint';
            default:
                return 'application/octet-stream';
        }
    }
    private getMimeType(name: string): string {
        const extension = path.extname(name).toLowerCase();
                return 'application/pdf';
    }
    // profile picture

    @Post("add-profile-picture/:applicationId")
    @ApiOkResponse({ type: ApplicationResponse })
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
            type: "object",
            properties: {
                attachmentUrl: {
                    type: "string",
                    format: "binary",
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor("attachmentUrl", {
            storage: diskStorage({
                destination: './uploads/profilePicture',
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    // const ext = extname(file.originalname);
                    const filename = `${file.originalname}-${uniqueSuffix}`;
                    callback(null, filename)
                },
            })
            // limits: { fileSize: Math.pow(2024, 2) },
        })
    )
    async addProfilePicture(
        @Param('applicationId') applicationId: string,
        @UploadedFile() attachmentUrl: Express.Multer.File,
    ): Promise<any> {
        if (attachmentUrl) {
            const result = await this.commands.uploadProfilePicture(String(attachmentUrl.filename).trim(), applicationId);
            return result
        }
    }
    // @Get("get-applier-profile-picture-by-applicationId/:applicationId")
    // @ApiOkResponse({ type: String })
    // async getDApplierProfilePictureByApplicationId(@Param('applicationId') applicationId: string) {
    //     return await this.queries.getDApplierProfilePictureByApplicationId(userId, applicationId)
    // }
    @Get('get-applier-profile-picture-by-applicationId/:applicationId')
    async getDApplierProfilePictureByApplicationId(
        @Param("applicationId") applicationId: string,
        @Res() res
    ) {
        const fileName = (await this.queries.getApplicationDetail(applicationId)).applierProfilePicture
        // return res.sendFile(fileName, { root: "./uploads/profilePicture" });
        console.log('the fileName is :', fileName)
        res.download(`./uploads/profilePicture/${fileName}`)
    }
}
