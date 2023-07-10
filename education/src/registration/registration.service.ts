import { Injectable } from '@nestjs/common';
import { CreateLicenseApllicationCommand } from './useCases/licenseApllication.command';

@Injectable()
export class RegistrationService {
  async CreateEmployee(command: CreateLicenseApllicationCommand): Promise<any> {
    return command;
  }
}
