import { IStatusDomainEntity } from 'src/domain/entities/interfaces';
import { ShipmentPostgresEntity } from '.';
import { Column, Entity, Index, OneToMany, Unique } from 'typeorm';

@Entity('status')
export class StatusPostgresEntity implements IStatusDomainEntity {
  @Index('status_primary_key', ['id'], { unique: true })
  @Column('uuid', {
    primary: true,
    name: 'status_id',
    default: () => 'uuid_generate_v4()',
    nullable: false,
  })
  @Unique('status_id_key', ['id'])
  id?: string;

  @Column('character varying', { name: 'name', nullable: false })
  name: string;

  @Column('character varying', { name: 'description', nullable: false })
  description: string;

  @OneToMany(() => ShipmentPostgresEntity, (shipment) => shipment.status)
  shipments?: ShipmentPostgresEntity[];

  constructor(name: string, description: string, id?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
