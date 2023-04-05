import { IUserDomainEntity } from 'src/domain/entities/interfaces';
import { ShipmentPostgresEntity } from '.';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';

@Entity('user')
export class UserPostgresEntity implements IUserDomainEntity {
  @Index('user_primary_key', ['id'], { unique: true })
  @Column('uuid', {
    primary: true,
    name: 'user_id',
    default: () => 'uuid_generate_v4()',
    nullable: false,
  })
  @Unique('user_id_key', ['id'])
  id?: string;

  @Column('character varying', {
    name: 'firebase_id',
    nullable: false,
  })
  @Unique('user_firebase_id_key', ['firebaseId'])
  firebaseId: string;

  @Column('character varying', { name: 'email', nullable: false })
  @Unique('user_email_key', ['email'])
  email: string;

  @Column('character varying', { name: 'password', nullable: false })
  password: string;

  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @Column('character varying', {
    name: 'document',
    nullable: false,
  })
  @Unique('user_document_key', ['document'])
  document: string;

  @Column('character varying', { name: 'phone', nullable: false })
  phone: string;

  @OneToMany(() => ShipmentPostgresEntity, (shipment) => shipment.user)
  shipments?: ShipmentPostgresEntity[];
}
