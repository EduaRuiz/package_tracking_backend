import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmPostgresConfigService } from './configs';
import {
  ClassDayPostgresEntity,
  GroupPostgresEntity,
  InscriptionPostgresEntity,
  SemesterPostgresEntity,
  StudentPostgresEntity,
} from './entities';
import {
  GroupPostgresRepository,
  InscriptionPostgresRepository,
  SemesterPostgresRepository,
  StudentPostgresRepository,
} from './repositories';
import {
  GroupPostgresService,
  InscriptionPostgresService,
  SemesterPostgresService,
  StudentPostgresService,
} from './services';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresConfigService,
    }),
    TypeOrmModule.forFeature([
      InscriptionPostgresEntity,
      GroupPostgresEntity,
      StudentPostgresEntity,
      SemesterPostgresEntity,
      ClassDayPostgresEntity,
    ]),
  ],
  controllers: [],
  providers: [
    TypeOrmPostgresConfigService,
    InscriptionPostgresRepository,
    GroupPostgresRepository,
    StudentPostgresRepository,
    SemesterPostgresRepository,
    InscriptionPostgresService,
    GroupPostgresService,
    StudentPostgresService,
    SemesterPostgresService,
  ],
  exports: [
    InscriptionPostgresRepository,
    GroupPostgresRepository,
    StudentPostgresRepository,
    SemesterPostgresRepository,
    InscriptionPostgresService,
    GroupPostgresService,
    StudentPostgresService,
    SemesterPostgresService,
  ],
})
export class PostgresModule {}
