import { Module } from '@nestjs/common';
import { MongooseConfigService } from './configs';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ShipmentMongoModel,
  ShipmentSchema,
  StatusMongoModel,
  StatusSchema,
  UserMongoModel,
  UserSchema,
} from './models';
import {
  ShipmentMongoRepository,
  StatusMongoRepository,
  UserMongoRepository,
} from './repositories';
import {
  ShipmentMongoService,
  StatusMongoService,
  UserMongoService,
} from './services';

/**
 * MongoModule is the module that contains all the dependencies to connect to the database and the repositories and services that will be used in the application.
 *
 * @export
 * @class MongoModule
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
    }),
    MongooseModule.forFeature([
      { name: ShipmentMongoModel.name, schema: ShipmentSchema },
      { name: UserMongoModel.name, schema: UserSchema },
      { name: StatusMongoModel.name, schema: StatusSchema },
    ]),
  ],
  controllers: [],
  providers: [
    MongooseConfigService,
    UserMongoRepository,
    ShipmentMongoRepository,
    StatusMongoRepository,
    UserMongoService,
    ShipmentMongoService,
    StatusMongoService,
  ],
  exports: [
    UserMongoRepository,
    ShipmentMongoRepository,
    StatusMongoRepository,
    UserMongoService,
    ShipmentMongoService,
    StatusMongoService,
  ],
})
export class MongoModule {}
