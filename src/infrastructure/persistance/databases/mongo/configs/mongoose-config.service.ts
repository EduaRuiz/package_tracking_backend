import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

/**
 * Configures the Mongoose module
 *
 * @export
 * @class MongooseConfigService
 * @typedef {MongooseConfigService}
 * @implements {MongooseOptionsFactory}
 */
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  /**
   * Creates an instance of MongooseConfigService.
   *
   * @constructor
   * @param {ConfigService} configService The config service
   */
  constructor(private readonly configService: ConfigService) {}

  /**
   * Description placeholder
   *
   * @returns {MongooseModuleOptions} The Mongoose module options
   */
  createMongooseOptions(): MongooseModuleOptions {
    return {
      // uri: this.configService.get<string>('MONGO_DB_URI_TRACKING_ONLINE'),
      // dbName: this.configService.get<string>('MONGO_DB_NAME_TRACKING'),
      uri: 'mongodb+srv://root:password*@tracking.dcufusb.mongodb.net',
      dbName: 'tracking',
    };
  }
}
