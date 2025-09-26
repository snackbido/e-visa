import { Visa } from '@visa/visa/entity/visa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column({ nullable: true, default: '' })
  phone_number: string;

  @Column()
  nationality: string;

  @Column()
  password: string;

  @OneToMany(() => Visa, (visa) => visa.user)
  visa: Visa[];

  @Column({ type: 'enum', enum: ROLES, default: ROLES.USER })
  role: ROLES;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
