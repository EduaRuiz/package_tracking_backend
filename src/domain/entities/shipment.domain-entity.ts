import { StatusDomainEntity, UserDomainEntity } from '.';
import { IShipmentDomainEntity } from './interfaces';

export class ShipmentDomainEntity implements IShipmentDomainEntity {
  _id?: string;
  user: UserDomainEntity;
  originAddress: string;
  destinationAddress: string;
  status: StatusDomainEntity;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    user: UserDomainEntity,
    originAddress: string,
    destinationAddress: string,
    status: StatusDomainEntity,
    createdAt: Date,
    updatedAt: Date,
    _id?: string,
  ) {
    this._id = _id;
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
