/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { LicenseApplicationEntity } from './persistence/application.entity';
import { UserEntity } from './persistence/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LicenseApplicantEducationEntity } from './persistence/education.entity';
import { LicenseApplicantexperienceEntity } from './persistence/experience.entity';
import { UserRepository } from './persistence/user.repository';
import { UserCommand } from './useCases/users.usecases.command';
import { UserController } from './controllers/user/user.controller';
import { UserQueries } from './useCases/users.usecase.queries';
import { ApiTags } from '@nestjs/swagger';
import { CertificateEntity } from './persistence/certificate.entity';
import { AccountEntity } from './persistence/accounts.entity';
import { MulterModule } from '@nestjs/platform-express';
import { EmployeesController } from './controllers/employees/employees.controller';
import { EmployeeQueries } from './useCases/employee.commands.ts/employee.usecase.queries';
import { EmployeeCommand } from './useCases/employee.commands.ts/employee.usecases.command';
import { EmployeeRepository } from './persistence/Employee/employee.repository';
import { EmployeeEntity } from './persistence/Employee/employee.entity';
import { EmployeeRoleEntity } from './persistence/Employee/employee-role.entity';
import { RoleEntity } from './persistence/roles/role.entity';
import { RoleController } from './controllers/role/role.controller';
import { RoleQueries } from './useCases/employee.commands.ts/role.usecase.queries';
import { RoleCommand } from './useCases/employee.commands.ts/role.usecases.command';
import { RoleRepository } from './persistence/roles/role.repository';
import { LocalAuthGuard } from 'src/back-office-auth/local-auth.guard';
import { LicenseEntity } from './persistence/License.entity';
import { PermissionController } from './controllers/permission/permission.controller';
import { RolePermissionEntity } from './persistence/roles/role-permission.entity';
import { PermissionEntity } from './persistence/Permission/permission.entity';
import { PermissionCommand } from './useCases/permission.commands/permission.usecases.command';
import { PermissionQueries } from './useCases/permission.commands/permission.usecase.queries';
import { PermissionRepository } from './persistence/Permission/permission.repository';

@ApiTags('Users')
@Module({
  imports: [TypeOrmModule.forFeature([
    LicenseApplicationEntity,
    LicenseApplicantEducationEntity,
    LicenseApplicantexperienceEntity,
    CertificateEntity,
    UserEntity,
    AccountEntity,
    EmployeeEntity,
    EmployeeRoleEntity,
    RoleEntity,
    LicenseEntity,
    RolePermissionEntity,
    PermissionEntity
//back office authenticator
    // LocalStrategy,
    // LocalAuthGuard
  ]),
  MulterModule,
  ],
  providers: [
    UserRepository,
    EmployeeRepository,
    RegistrationService,
    RoleRepository,
    PermissionRepository,
    // commands
    UserCommand,
    EmployeeCommand,
    RoleCommand,
    PermissionCommand,
    // Queries
    UserQueries,
    EmployeeQueries,
    RoleQueries,
    PermissionQueries
  ],
  exports:[UserQueries,EmployeeQueries],
  controllers: [RegistrationController,UserController, EmployeesController, RoleController, PermissionController,PermissionController],
})
export class RegistrationModule {
  constructor() {
    // console.log('Connected to database');
  }
}
