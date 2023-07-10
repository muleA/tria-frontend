import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateLicenseApllicationCommand } from './useCases/licenseApllication.command';

@Controller('registration')
export class RegistrationController {
  constructor(private service: RegistrationService) {}
  // @Post('CreateEmployees')
  // async createEmployees(@Body() command: CreateLicenseApllicationCommand) {
  //   // return await this.service.CreateEmployee(command);
  // }
}
