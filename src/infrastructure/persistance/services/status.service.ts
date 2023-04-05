import { Injectable } from '@nestjs/common';
import { StatusPostgresService } from '../databases/postgres/services';
import { StatusMongoService } from '../databases/mongo/services';

@Injectable()
export class StatusService extends StatusMongoService {}
