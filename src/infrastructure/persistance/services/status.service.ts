import { Injectable } from '@nestjs/common';
import { StatusPostgresService } from '../databases/postgres/services';

@Injectable()
export class StatusService extends StatusPostgresService {}
