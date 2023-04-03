import { Module } from '@nestjs/common';
import { PostgresModule } from './databases/postgres';

/**
 * Modulo de persistencia
 *
 * @export
 * @class PersistenceModule
 */
@Module({
  imports: [PostgresModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class PersistenceModule {}
