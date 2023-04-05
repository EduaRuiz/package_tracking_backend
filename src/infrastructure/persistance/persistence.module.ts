import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';
import { ShipmentService, StatusService, UserService } from './services';

/**
 * PersistenceModule - Module that contains all the persistence logic
 *
 * @export
 * @class PersistenceModule
 */
@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [UserService, ShipmentService, StatusService],
  exports: [UserService, ShipmentService, StatusService],
})
export class PersistenceModule {}
