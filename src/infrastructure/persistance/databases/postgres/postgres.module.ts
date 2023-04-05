import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfigService } from './config';
import {
  ShipmentPostgresEntity,
  StatusPostgresEntity,
  UserPostgresEntity,
} from './entities';
import {
  ShipmentPostgresRepository,
  StatusPostgresRepository,
  UserPostgresRepository,
} from './repositories';
import {
  ShipmentPostgresService,
  StatusPostgresService,
  UserPostgresService,
} from './services';

/**
 * PostgresModule - Module that contains all the postgres logic
 *
 * @export
 * @class PostgresModule
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      UserPostgresEntity,
      ShipmentPostgresEntity,
      StatusPostgresEntity,
    ]),
  ],
  controllers: [],
  providers: [
    TypeOrmPostgresConfigService,
    UserPostgresRepository,
    ShipmentPostgresRepository,
    StatusPostgresRepository,
    UserPostgresService,
    ShipmentPostgresService,
    StatusPostgresService,
  ],
  exports: [
    UserPostgresRepository,
    ShipmentPostgresRepository,
    StatusPostgresRepository,
    UserPostgresService,
    ShipmentPostgresService,
    StatusPostgresService,
  ],
})
export class PostgresModule {}
