import { StatusDomainEntity, UserDomainEntity } from '.';
import { IShipmentDomainEntity } from './interfaces';

export class ShipmentDomainEntity implements IShipmentDomainEntity {
  id?: string;
  user: UserDomainEntity;
  originAddress: string;
  destinationAddress: string;
  status: StatusDomainEntity;
  createdAt: Date;
  updatedAt: Date;
}
