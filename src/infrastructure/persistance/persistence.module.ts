import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';
import { ShipmentService, StatusService, UserService } from './services';
import { MongoModule } from './databases/mongo';

/**
 * PersistenceModule - Module that contains all the persistence logic
 *
 * @export
 * @class PersistenceModule
 */
@Module({
  imports: [PostgresModule, MongoModule],
  controllers: [],
  providers: [UserService, ShipmentService, StatusService],
  exports: [UserService, ShipmentService, StatusService],
})
export class PersistenceModule {}
