import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserDomainEntity } from 'src/domain/entities/interfaces';

@Schema({ collection: 'user', versionKey: false })
export class UserMongoModel implements IUserDomainEntity {
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
  password: string;

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
