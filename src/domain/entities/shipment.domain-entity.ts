import { StatusDomainEntity, UserDomainEntity } from '.';
import { IShipmentDomainEntity } from './interfaces';

export class ShipmentDomainEntity implements IShipmentDomainEntity {
  _id?: string;
  user: UserDomainEntity;
  description: string;
  originAddress: string;
  destinationAddress: string;
  status: StatusDomainEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    user: UserDomainEntity,
    description: string,
    originAddress: string,
    destinationAddress: string,
    status: StatusDomainEntity,
    createdAt: Date,
    updatedAt: Date,
    _id?: string,
  ) {
    this._id = _id;
    this.description = description;
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
