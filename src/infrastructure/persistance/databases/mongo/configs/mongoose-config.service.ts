import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createMongooseOptions(): MongooseModuleOptions {
    return {
      // uri: this.configService.get<string>('MONGO_DB_URI_TRACKING_ONLINE'),
      // dbName: this.configService.get<string>('MONGO_DB_NAME_TRACKING'),
      uri: 'mongodb+srv://root:password*@tracking.dcufusb.mongodb.net',
      dbName: 'tracking',
    };
  }
}
