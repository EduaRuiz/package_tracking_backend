import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IShipmentDomainEntity } from 'src/domain/entities/interfaces';
import { StatusMongoModel, UserMongoModel } from '.';

@Schema({ collection: 'shipment', versionKey: false })
export class ShipmentMongoModel implements IShipmentDomainEntity {
  constructor(
    user: UserMongoModel,
    originAddress: string,
    destinationAddress: string,
    status: StatusMongoModel,
    createdAt: Date,
    updatedAt: Date,
    _id?: string,
  ) {
    this.user = user;
    this.originAddress = originAddress;
    this.destinationAddress = destinationAddress;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this._id = _id;
  }
  _id?: string;

  @Prop({
    required: true,
    type: String,
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserMongoModel',
    required: true,
  })
  user: UserMongoModel;

  @Prop({
    required: true,
    type: String,
  })
  originAddress: string;

  @Prop({
    required: true,
    type: String,
  })
  destinationAddress: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StatusMongoModel',
    required: true,
  })
  status: StatusMongoModel;

  @Prop({
    required: true,
    type: Date,
  })
  createdAt: Date;

  @Prop({
    required: true,
    type: Date,
  })
  updatedAt: Date;
}

export const ShipmentSchema = SchemaFactory.createForClass(ShipmentMongoModel);
export type ShipmentDocument = HydratedDocument<ShipmentMongoModel>;
