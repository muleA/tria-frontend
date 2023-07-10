/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LicenseApplicantEducationEntity } from './education.entity';
import { LicenseApplicantexperienceEntity } from './experience.entity';
import { LicenseApplicationEntity } from './application.entity';
import { CommonEntity } from './common.entity';
import { CertificateEntity } from './certificate.entity';
import { UserEntity } from './user.entity';
import { EmployeeEntity } from './Employee/employee.entity';

@Entity({ name: 'account' })
export class AccountEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ name: 'user_name' })
  userName: string;

  @Column({ name: 'email' ,nullable:false})
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'account_type',default:'user' })
  accountType: string
  @Column({ name: 'status',default:'active' })
  status: string
  
  
  @OneToOne(() => UserEntity, (user) => user.account)
  user: UserEntity
  @OneToOne(() => EmployeeEntity, (employee) => employee.account)
  employee: EmployeeEntity
}
