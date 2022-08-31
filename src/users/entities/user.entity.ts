import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 60, nullable: false })
  name: string;

  @Column('string', { nullable: false, length: 64 })
  email: string;

  @Column({ select: false, nullable: false })
  password: string;

  @Column('date', {
    default: new Date(),
  })
  createdAt: string;

  @Column('date')
  birthDate: string;

  @Column('int', {
    default: 5000,
  })
  amount: number;

  @Column('string')
  country: string;

  @Column('string')
  city: string;

  @Column('string')
  currency: string;

  @Column()
  isValid: boolean;
}
