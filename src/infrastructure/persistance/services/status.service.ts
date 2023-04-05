import { Injectable } from '@nestjs/common';
import { StatusMongoService } from '../databases/mongo/services';

@Injectable()
export class StatusService extends StatusMongoService {}
