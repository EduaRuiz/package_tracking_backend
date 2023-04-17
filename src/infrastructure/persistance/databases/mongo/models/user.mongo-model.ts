import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { IUserDomainEntity } from 'src/domain/entities/interfaces';

/**
 * User Mongo Model class
 *
 * @export
 * @class UserMongoModel
 * @typedef {UserMongoModel}
 * @implements {IUserDomainEntity}
 */
@Schema({ collection: 'user', versionKey: false })
export class UserMongoModel implements IUserDomainEntity {
  /**
   * Creates an instance of UserMongoModel.
   *
   * @constructor
   * @param {string} firebaseId Firebase id
   * @param {string} email Email
   * @param {string} name Name
   * @param {string} document Document
   * @param {string} phone Phone
   * @param {?string} [_id] Id of the user
   */
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
  /**
   * Id of the user
   *
   * @type {?string}
   */
  _id?: string;

  /**
   * Firebase id of the user
   *
   * @type {string}
   */
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  firebaseId: string;

  /**
   * Email of the user
   *
   * @type {string}
   */
  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;

  /**
   * Name of the user
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  /**
   * Document of the user
   *
   * @type {string}
   */
  @Prop({
    required: true,
    unique: true,
    type: Number,
  })
  document: string;

  /**
   * Phone of the user
   *
   * @type {string}
   */
  @Prop({
    required: true,
    type: Number,
  })
  phone: string;
}

/**
 * User Mongo Model schema
 *
 * @type {*}
 */
export const UserSchema = SchemaFactory.createForClass(UserMongoModel);
/**
 * User Mongo Model document
 *
 * @export
 * @typedef {UserDocument}
 */
export type UserDocument = HydratedDocument<UserMongoModel>;
