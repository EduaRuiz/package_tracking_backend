import { ShipmentDomainEntity } from '.';
import { IUserDomainEntity } from './interfaces';

export class UserDomainEntity implements IUserDomainEntity {
  id?: string;
  firebaseId: string;
  email: string;
  password: string;
  name: string;
  document: string;
  phone: string;
  shipment?: [ShipmentDomainEntity];
}
