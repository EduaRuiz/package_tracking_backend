import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IStatusDomainEntity } from 'src/domain/entities/interfaces';

/**
 * Status Mongo Model class
 *
 * @export
 * @class StatusMongoModel
 * @typedef {StatusMongoModel}
 * @implements {IStatusDomainEntity}
 */
@Schema({ collection: 'status', versionKey: false })
export class StatusMongoModel implements IStatusDomainEntity {
  /**
   * Creates an instance of StatusMongoModel.
   *
   * @constructor
   * @param {string} name Name
   * @param {string} description Description
   * @param {?string} [_id] Id of the status
   */
  constructor(name: string, description: string, _id?: string) {
    this._id = _id;
    this.name = name;
    this.description = description;
  }
  /**
   * Id of the status
   *
   * @type {?string}
   */
  _id?: string;

  /**
   * Name of the status
   *
   * @type {string}
   */
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  name: string;

  /**
   * Description of the status
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: String,
  })
  description: string;
}

/**
 * Status Mongo Model schema
 *
 * @type {*}
 */
export const StatusSchema = SchemaFactory.createForClass(StatusMongoModel);
/**
 * Status Mongo Model document
 *
 * @export
 * @typedef {StatusDocument}
 */
export type StatusDocument = HydratedDocument<StatusMongoModel>;
