import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IShipmentDomainEntity } from 'src/domain/entities/interfaces';
import { StatusMongoModel, UserMongoModel } from '.';

/**
 * Shipment Mongo Model class
 *
 * @export
 * @class ShipmentMongoModel
 * @typedef {ShipmentMongoModel}
 * @implements {IShipmentDomainEntity}
 */
@Schema({ collection: 'shipment', versionKey: false })
export class ShipmentMongoModel implements IShipmentDomainEntity {
  /**
   * Creates an instance of ShipmentMongoModel.
   *
   * @constructor
   * @param {UserMongoModel} user User
   * @param {string} originAddress Origin address
   * @param {string} destinationAddress Destination address
   * @param {StatusMongoModel} status Status
   * @param {Date} createdAt Created at
   * @param {Date} updatedAt Updated at
   * @param {?string} [_id] Id of the shipment
   */
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
  /**
   * Id of the shipment
   *
   * @type {?string}
   */
  _id?: string;

  /**
   * Description of the shipment
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: String,
  })
  description: string;

  /**
   * User of the shipment
   *
   * @type {UserMongoModel}
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserMongoModel',
    required: true,
  })
  user: UserMongoModel;

  /**
   * Origin address of the shipment
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: String,
  })
  originAddress: string;

  /**
   * Destination address of the shipment
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: String,
  })
  destinationAddress: string;

  /**
   * Status of the shipment
   *
   * @type {StatusMongoModel}
   */
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'StatusMongoModel',
    required: true,
  })
  status: StatusMongoModel;

  /**
   * Date of created at of the shipment
   *
   * @type {Date}
   */
  @Prop({
    required: true,
    type: Date,
  })
  createdAt: Date;

  /**
   * Date of updated at of the shipment
   *
   * @type {Date}
   */
  @Prop({
    required: true,
    type: Date,
  })
  updatedAt: Date;
}

/**
 * Shipment schema
 *
 * @type {*}
 */
export const ShipmentSchema = SchemaFactory.createForClass(ShipmentMongoModel);
/**
 * Shipment document
 *
 * @export
 * @typedef {ShipmentDocument}
 */
export type ShipmentDocument = HydratedDocument<ShipmentMongoModel>;
