import { IShipmentDomainEntity } from '.';

export interface IUserDomainEntity {
  _id?: string;
  firebaseId: string;
  email: string;
  name: string;
  document: string;
  phone: string;
}
