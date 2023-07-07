/* eslint-disable prettier/prettier */
import { CommonEntity } from 'src/registration/persistence/common.entity';
import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { FormAttributeEntity } from './attribute.entity';

  @Entity('form')
  export class FormEntity extends CommonEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({name:"name"})
    name: string;
    @Column({name:"version"})
    version: string; 
    @Column({name:"is_active",default:true})
    isActive: string; 
    @Column({name:"code"})
    code: string;
    @Column({name:"status",default:"Active"})
    status: string; 
    @Column({name:"is-system-form",default:true})
    isSystemForm: boolean; 
    
    @OneToMany(
        () => FormAttributeEntity,
        (applicantexperience) => applicantexperience.form,
        { cascade: true },
      )
    formAttributes: FormAttributeEntity[]; 
   
  }
  