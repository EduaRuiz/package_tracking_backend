import { Injectable } from '@nestjs/common';
import { UserMongoService } from '../databases/mongo/services';

/**
 * User Service class
 *
 * @export
 * @class UserService
 * @typedef {UserService}
 * @extends {UserMongoService}
 */
@Injectable()
export class UserService extends UserMongoService {}
