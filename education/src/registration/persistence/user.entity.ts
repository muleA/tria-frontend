/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LicenseApplicantEducationEntity } from './education.entity';
import { LicenseApplicantexperienceEntity } from './experience.entity';
import { LicenseApplicationEntity } from './application.entity';
import { CommonEntity } from './common.entity';
import { CertificateEntity } from './certificate.entity';
import { AccountEntity } from './accounts.entity';
import { LicenseEntity } from './License.entity';

@Entity({name:'user'})
export class UserEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ name: 'middle_name' })
  middleName: string;
  @Column({ name: 'gender' })
  gender: string;
  @Column({ name: 'sub_city' })
  subCity: string;
  @Column({ name: 'city' })
  city: string;
  @Column({ name: 'wereda' })
  wereda: string;
  @Column({ name: 'kebele' })
  kebele: string;
  @Column({ name: 'phone' })
  phone: string;
  @Column({ name: 'email'})
  email: string;
  @Column({ name: 'status',default:'active' })
  status: string;
  @Column({ name: 'house_number' })
  houseNumber: string;
  @OneToMany(
    () => LicenseApplicantEducationEntity,
    (applicantEducation) => applicantEducation.user,
    { cascade: true },
  )
  education: LicenseApplicantEducationEntity[];
  @OneToMany(
    () => LicenseApplicantexperienceEntity,
    (applicantexperience) => applicantexperience.user,
    { cascade: true },
  )
  expiriance: LicenseApplicantexperienceEntity[];
  @OneToMany(
    () => LicenseApplicationEntity,
    (applicationEntity) => applicationEntity.user,
    { cascade: true },
  )
  applications:LicenseApplicationEntity[]

  @OneToMany(
    () => LicenseEntity,
    (licenseEntity) => licenseEntity.user,
    { cascade: true },
  )
  license:LicenseEntity[]
  @OneToMany(
    () => CertificateEntity,
    (certificateEntity) => certificateEntity.user,
    { cascade: true },
  )
  certificate:CertificateEntity[]
  @Column({ name: 'account_id',nullable:false ,unique:true})
  accountId: string;
  @JoinColumn({name:'account_id'})
  @OneToOne(()=>AccountEntity,(account)=>account.user)
  account:AccountEntity
}
