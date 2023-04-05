import { ShipmentDomainEntity } from '.';
import { IStatusDomainEntity } from './interfaces';

export class StatusDomainEntity implements IStatusDomainEntity {
  id?: string;
  name: string;
  description: string;

  constructor(name: string, description: string, id?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}
