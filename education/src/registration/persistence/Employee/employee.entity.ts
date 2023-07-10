/* eslint-disable prettier/prettier */
import {
    Entity,
    Column,
    OneToMany,
    OneToOne,
    JoinColumn,
    PrimaryGeneratedColumn,
  } from 'typeorm';
import { CommonEntity } from '../common.entity';
import { EmployeeRoleEntity } from './employee-role.entity';
import { AccountEntity } from '../accounts.entity';

  
  @Entity({name:'employee'})
  export class EmployeeEntity extends CommonEntity {
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
    @Column({ name: 'email' })
    email: string;
    @Column({ name: 'status',nullable:true}) 
    status: string;
    @Column({ name: 'house_number' })
    houseNumber: string;
    @OneToMany(
      () => EmployeeRoleEntity,
      (employeeRoleEntity) => employeeRoleEntity.employee,
      { cascade: true },
    )
    employeeRole: EmployeeRoleEntity[];

    @Column({ name: 'account_id',nullable:true })
    accountId: string;
    @JoinColumn({name:'account_id'})
    @OneToOne(()=>AccountEntity,(account)=>account.employee)
    account:AccountEntity
  }
  
  
