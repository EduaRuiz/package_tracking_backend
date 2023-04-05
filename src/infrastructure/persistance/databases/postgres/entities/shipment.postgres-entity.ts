import { IShipmentDomainEntity } from 'src/domain/entities/interfaces';
import { StatusPostgresEntity, UserPostgresEntity } from '.';
import { Column, Entity, Index, JoinColumn, ManyToOne, Unique } from 'typeorm';

@Entity('shipment')
export class ShipmentPostgresEntity implements IShipmentDomainEntity {
  @Index('shipment_primary_key', ['id'], { unique: true })
  @Column('uuid', {
    primary: true,
    name: 'shipment_id',
    default: () => 'uuid_generate_v4()',
    nullable: false,
  })
  @Unique('shipment_id_key', ['id'])
  id?: string;

  @ManyToOne(() => UserPostgresEntity, (user) => user.shipments)
  @JoinColumn({ name: 'user_id' })
  user: UserPostgresEntity;

  @Column('character varying', { name: 'origin_address', nullable: false })
  originAddress: string;

  @Column('character varying', { name: 'destination_address', nullable: false })
  destinationAddress: string;

  @ManyToOne(() => StatusPostgresEntity, (status) => status.shipments)
  @JoinColumn({ name: 'status_id' })
  status: StatusPostgresEntity;

  @Column({
    name: 'date_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updatedAt: Date;

  constructor(
    user: UserPostgresEntity,
    originAddress: string,
    destinationAddress: string,
    status: StatusPostgresEntity,
    createdAt: Date,
    updatedAt: Date,
    id?: string,
  ) {
    this.id = id;
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
