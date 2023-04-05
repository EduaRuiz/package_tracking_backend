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

  constructor(
    firebaseId: string,
    email: string,
    password: string,
    name: string,
    document: string,
    phone: string,
    id?: string,
  ) {
    this.id = id;
    this.firebaseId = firebaseId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.document = document;
    this.phone = phone;
  }
}
