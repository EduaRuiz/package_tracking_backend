import {
  IRegisterNewShipmentDto,
  ISignInDto,
  ISignUpDto,
  IUpdateShipmentDto,
} from 'src/domain/dto';
import { INewStatusDto } from 'src/domain/dto';
import {
  IShipmentDomainEntity,
  IStatusDomainEntity,
  IUserDomainEntity,
} from 'src/domain/entities';
import { IUserResponse } from 'src/domain/interfaces';

export const user: IUserDomainEntity = {
  _id: 'userId',
  firebaseId: 'firebaseId',
  name: 'name',
  email: 'email',
  document: 'document',
  phone: 'phone',
};

export const status: IStatusDomainEntity = {
  _id: 'statusId',
  name: 'CREATED',
  description: 'Shipment created',
};

export const shipment: IShipmentDomainEntity = {
  _id: 'shipmentId',
  description: 'description',
  user,
  originAddress: 'originAddress',
  destinationAddress: 'destinationAddress',
  status,
  updatedAt: new Date(),
  createdAt: new Date(),
};

export const registerNewShipmentDto: IRegisterNewShipmentDto = {
  description: 'description',
  originAddress: 'originAddress',
  destinationAddress: 'destinationAddress',
  userId: 'userId',
};

export const signInDto: ISignInDto = {
  email: 'email',
  firebaseId: 'firebaseId',
};

export const signUpDto: ISignUpDto = {
  name: 'name',
  firebaseId: 'firebaseId',
  email: 'email',
  document: 'document',
  phone: 'phone',
};

export const userResponse: IUserResponse = {
  data: {
    _id: 'userId',
    name: 'name',
    email: 'email',
  },
  token: 'token',
};

export const newStatusDto: INewStatusDto = {
  name: 'name',
  description: 'description',
};

export const updateShipmentDto: IUpdateShipmentDto = {
  originAddress: 'new origin address',
  destinationAddress: 'new destination address',
  statusId: 'statusId',
};
