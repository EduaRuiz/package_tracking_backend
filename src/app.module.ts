import { Module } from '@nestjs/common';
import {
  ShipmentController,
  StatusController,
  UserController,
} from './infrastructure/controllers';
import { PersistenceModule } from './infrastructure/persistance';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './infrastructure/utils/services';
import { MongoServerErrorExceptionFilter } from './infrastructure/utils/exception-filters';
import { APP_FILTER } from '@nestjs/core';

/**
 * AppModule - Main module of the application
 *
 * @export
 * @class AppModule
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        'environments',
        `.env.${process.env.SCOPE?.trimEnd()}`,
      ),
    }),
    JwtModule.register({
      global: true,
      secret: 'Ll4v3',
      signOptions: { expiresIn: '2h' },
    }),
    PersistenceModule,
  ],
  controllers: [UserController, ShipmentController, StatusController],
  providers: [
    AuthService,
    {
      provide: APP_FILTER,
      useClass: MongoServerErrorExceptionFilter,
    },
  ],
})
export class AppModule {}
