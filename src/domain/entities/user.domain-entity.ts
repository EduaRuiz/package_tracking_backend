import { ShipmentDomainEntity } from '.';
import { IUserDomainEntity } from './interfaces';

export class UserDomainEntity implements IUserDomainEntity {
  _id?: string;
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
    _id?: string,
  ) {
    this._id = _id;
    this.firebaseId = firebaseId;
    this.email = email;
    this.password = password;
    this.name = name;
    this.document = document;
    this.phone = phone;
  }
}
