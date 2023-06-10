/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// import { ApiProperty } from '@nestjs/swagger';
// import { IsUUID, IsNotEmpty } from 'class-validator';

// export class CreateEmployeeCommand {
//   // @ApiProperty()
//   // @IsUUID()
//   id: string;
//   @ApiProperty()
//   @IsUUID()
//   @IsNotEmpty()
//   organizationId: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   name: string;
//   @ApiProperty()
//   description: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   code: string;
//   @ApiProperty()
//   @IsNotEmpty()
//   providerCanUpdate: boolean;
//   @ApiProperty()
//   isActive: boolean;
//   @ApiProperty()
//   islocked: boolean;
//   @ApiProperty()
//   status: string;
//   @ApiProperty()
//   @IsEnum(DeviveryMethods, {
//     message: 'must be AUTOMATED, SEMIAUTOMATED or  MANUAL ',
//   })
//   deviveryMethod: DeviveryMethods;
//   @ApiProperty()
//   @IsEnum(ConcurrentRequestOptions, {
//     message: 'ConcurrentRequestOptions must be ALLOWED or DISALLOWED ',
//   })
//   concurrentRequestOption: ConcurrentRequestOptions;
//   @ApiProperty()
//   hasRedirectURL: boolean;
//   @ApiProperty()
//   redirectURL: string;
//   @ApiProperty()
//   serviceProviders: CreateServiceProviderCommand[];
//   /**
//    *A method that mapes  CreateServiceCommand object data to  Service domain object
//    *@returns Service domain object which contains Service  information
//    */
//   static fromCommands(serviceCommand: CreateServiceCommand): Service {
//     const service: Service = new Service();
//     service.id = serviceCommand.id;
//     service.organizationId = serviceCommand.organizationId;
//     service.name = serviceCommand.name;
//     service.description = serviceCommand.description;
//     service.code = serviceCommand.code;
//     service.providerCanUpdate = serviceCommand.providerCanUpdate;
//     service.isActive = serviceCommand.isActive;
//     service.islocked = serviceCommand.islocked;
//     service.status = serviceCommand.status;
//     service.deviveryMethod = serviceCommand.deviveryMethod;
//     service.concurrentRequestOption = serviceCommand.concurrentRequestOption;
//     service.hasRedirectURL = serviceCommand.hasRedirectURL;
//     service.redirectURL = serviceCommand.redirectURL;
//     service.serviceProviders = serviceCommand.serviceProviders?.map((item) =>
//       CreateServiceProviderCommand.fromCommands(item),
//     );
//     return service;
//   }
// }
