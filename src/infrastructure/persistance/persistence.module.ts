import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';
import { ShipmentService, StatusService, UserService } from './services';

/**
 * Modulo de persistencia
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
