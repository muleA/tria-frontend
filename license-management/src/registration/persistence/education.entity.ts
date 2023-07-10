/* eslint-disable prettier/prettier */
import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonEntity } from './common.entity';
@Entity('education')
export class LicenseApplicantEducationEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ name: 'institution' })
  Institution: string;
  @Column({ name: 'field_of_study' })
  fieldOfStudy: string;
  @Column({ name: 'professional_title' })
  professionalTitle: string;
  @Column({ name: 'student_id_number' })
  studentIdNumber: string;
  @Column({ name: 'received_date' })
  receivedDate: string;
  @Column({ name: 'file',nullable:true })
  file:string
  
  @Column({ name: 'user_id' ,nullable:false})
  userId: string;
  @JoinColumn({ name: 'user_id'})
  @ManyToOne(() => UserEntity, (user) => user.education, {
    orphanedRowAction: 'delete',
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
 })
 user:UserEntity
}
