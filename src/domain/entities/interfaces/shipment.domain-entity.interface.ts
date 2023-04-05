import { IStatusDomainEntity, IUserDomainEntity } from '.';

export interface IShipmentDomainEntity {
  id?: string;
  user: IUserDomainEntity;
  originAddress: string;
  destinationAddress: string;
  status: IStatusDomainEntity;
  createdAt: Date;
  updatedAt: Date;
}
