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
