import { ShipmentDomainEntity } from '.';
import { IStatusDomainEntity } from './interfaces';

export class StatusDomainEntity implements IStatusDomainEntity {
  _id?: string;
  name: string;
  description: string;

  constructor(name: string, description: string, _id?: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
}
