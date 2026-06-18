import { User } from '@visa/user/entity/user.entity';
import { Visa } from '@visa/visa/entity/visa.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum STATUS {
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
  PAID = 'PAID',
  FAILED = 'FAILED',
  EXPIRED = 'EXPIRED',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  user_id!: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user!: User;

  @OneToOne(() => Visa, (visa) => visa.payment, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'visa_id' })
  visa!: Visa;

  @Column()
  visa_id!: string;

  @Column()
  amount!: number;

  @Column()
  payment_gate!: string;

  @Column()
  payment_method!: string;

  @Column()
  payment_id!: string;

  @Column({ type: 'enum', enum: STATUS, default: STATUS.PENDING })
  status!: STATUS;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
