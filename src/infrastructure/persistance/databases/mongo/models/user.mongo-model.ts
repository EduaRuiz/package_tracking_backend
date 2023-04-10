import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserDomainEntity } from 'src/domain/entities/interfaces';

@Schema({ collection: 'user', versionKey: false })
export class UserMongoModel implements IUserDomainEntity {
  constructor(
    firebaseId: string,
    email: string,
    name: string,
    document: string,
    phone: string,
    _id?: string,
  ) {
    this._id = _id;
    this.firebaseId = firebaseId;
    this.email = email;
    this.name = name;
    this.document = document;
    this.phone = phone;
  }
  _id?: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  firebaseId: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;

  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    type: Number,
  })
  document: string;

  @Prop({
    required: true,
    type: Number,
  })
  phone: string;
}

export const UserSchema = SchemaFactory.createForClass(UserMongoModel);
export type UserDocument = HydratedDocument<UserMongoModel>;
