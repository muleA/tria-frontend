/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { LicenseApplicationEntity } from './application.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from "typeorm";
// import { License } from '../domain/License';
// import { LicenseEntity } from './License.entity';
// @Injectable()
// export class LicenseApplicationRepository {
//     constructor(
//         @InjectRepository(LicenseApplicationEntity)
//         private serviceDetailRepository: Repository<LicenseApplicationEntity>
//       ) {
//         //  super()
       
//       }
//       async addLicense(license: License): Promise<License> {
//         const userEntity=this.toLicenseEntity(license)
//         const result=await this.lic.save(userEntity)
//         return result? this.toUser(result):null;
//     }

//     private toLicenseEntity(license: License): LicenseEntity {

//       const licenseEntity: LicenseEntity = new LicenseEntity()
//       licenseEntity.id = license.id
//       licenseEntity.validFrom = license.validFrom
//       licenseEntity.validTo = license.validTo
//       licenseEntity.userId = license.userId
//       licenseEntity.status = license.status

//       licenseEntity.createdAt = license.createdAt
//       licenseEntity.createdBy = license.createdBy
//       licenseEntity.updatedAt = license.updatedAt
//       licenseEntity.updatedBy = license.updatedBy
//       licenseEntity.deletedAt = license.deletedAt
//       licenseEntity.deletedBy = license.deletedBy
//       // licenseEntity.user = expiriance.user?this.toUserEntity(expiriance.user):null

//       return licenseEntity
//   }
//   private toLicense(licenseEntity: LicenseEntity): License {

//       const license: License = new License()
//       license.id = licenseEntity?.id
//       license.validFrom = licenseEntity.validFrom
//       license.validTo = licenseEntity.validTo
//       license.userId = licenseEntity.userId
//       license.status = licenseEntity.status
      
//       // license.user = this.toUser(licenseEntity.user)

//       license.createdAt = licenseEntity.createdAt
//       license.createdBy = licenseEntity.createdBy
//       license.deletedAt = licenseEntity.deletedAt
//       license.deletedBy = licenseEntity.deletedBy
//       license.updatedAt = licenseEntity.updatedAt
//       license.updatedBy = licenseEntity.updatedBy

//       return license
//   }
// }
