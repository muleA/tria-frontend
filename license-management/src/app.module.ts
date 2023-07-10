/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistrationModule } from './registration/registration.module';
import { LicenseApplicationEntity } from './registration/persistence/application.entity';
import { UserEntity } from './registration/persistence/user.entity';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseApplicantEducationEntity } from './registration/persistence/education.entity';
import { LicenseApplicantexperienceEntity } from './registration/persistence/experience.entity';
import { CertificateEntity } from './registration/persistence/certificate.entity';
import { ApiTags } from '@nestjs/swagger';
import { UserQueries } from './registration/useCases/users.usecase.queries';
import { UserRepository } from './registration/persistence/user.repository';
import { AccountEntity } from './registration/persistence/accounts.entity';
import { AuthModule } from './auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { EmployeeEntity } from './registration/persistence/Employee/employee.entity';
import { EmployeeRoleEntity } from './registration/persistence/Employee/employee-role.entity';
import { RoleEntity } from './registration/persistence/roles/role.entity';
import { LicenseEntity } from './registration/persistence/License.entity';
import { BackOfficeAuthModule } from './back-office-auth/back-office-auth.module';
import { PermissionEntity } from './registration/persistence/Permission/permission.entity';
import { RolePermissionEntity } from './registration/persistence/roles/role-permission.entity';
import { FormGeneratorModule } from './form-generator/form-generator.module';
import { FormEntity } from './form-generator/persistance/form.entity';
import { FormAttributeEntity } from './form-generator/persistance/attribute.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { Task } from './Task/task.module';
import { TaskEntity } from './Task/task/persistance/task.entity';
import { TaskExecutionMethodsVarationEntity } from './Task/task/persistance/task-execution-methods-varation.entity';
import { TaskExecutionTypeEntity } from './Task/task/persistance/task-execution-type.entity';
import { TaskGroupEntity } from './Task/task/persistance/task-group.entity';
import { TaskCheckListEntity } from './Task/task/persistance/taskchecklist.entity';

@ApiTags('Users')
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    MulterModule.register({ dest: './uploads' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '20.21.120.66',
      port: 5432,
      username: 'postgres',
      password: 'dcba@1234',
      database: 'IFHCRS',
      entities: [AccountEntity,
        UserEntity,
        LicenseApplicantEducationEntity,
        LicenseApplicantexperienceEntity,
        LicenseApplicationEntity,
        CertificateEntity,
        EmployeeEntity,
        EmployeeRoleEntity,
        RoleEntity,
        LicenseEntity,
        PermissionEntity,
        RolePermissionEntity,
        FormEntity,
        FormAttributeEntity,
        TaskEntity,
        TaskExecutionMethodsVarationEntity,
        TaskExecutionTypeEntity,
        TaskGroupEntity,
        TaskCheckListEntity
      ],
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,

    }),

    RegistrationModule,
    AuthModule,
    FormGeneratorModule,
    // BackOfficeAuthModule,
    Task
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule { }
