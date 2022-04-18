import { BaseEntity } from '../../utility/entity';
import { Entity, Column } from 'typeorm';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  password?: string;

  @Column('text', {
    nullable: true,
  })
  name?: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  apple_id?: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  google_id?: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  facebook_id?: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  phone?: string;

  @Column('text', {
    nullable: true,
    unique: true,
  })
  reset_password_token?: string;

  @Column('text')
  provider: string;

  @Column('text')
  role: string;

  @Column('boolean', { default: true })
  is_account_active: boolean;

  @Column('text', {
    unique: true,
    nullable: true,
  })
  customer_id: string;
}
