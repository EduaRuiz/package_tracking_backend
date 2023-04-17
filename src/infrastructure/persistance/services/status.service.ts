import { Injectable } from '@nestjs/common';
import { StatusMongoService } from '../databases/mongo/services';

/**
 * Status Service class
 *
 * @export
 * @class StatusService
 * @typedef {StatusService}
 * @extends {StatusMongoService}
 */
@Injectable()
export class StatusService extends StatusMongoService {}
