import { User } from '@visa/user/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Visa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  full_name: string;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @Column()
  date_of_arrival: string;

  @Column()
  arrival_border: string;

  @Column('json')
  applicant: {
    [key: string]: {
      passport_name: string;
      passport_number: string;
      gender: string;
      avatar: string;
      passport_image: string;
    };
  };

  @Column()
  nationality: string;

  @Column()
  number_of_visa: number;

  @Column()
  time_of_visa: string;

  @Column()
  type_of_visa: string;

  @Column()
  processing_time: string;

  @Column()
  purpose_of_visit: string;

  @ManyToOne(() => User, (user) => user.visa, { cascade: true })
  @JoinColumn({ name: 'visa_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
