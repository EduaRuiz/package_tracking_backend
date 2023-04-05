import { Injectable } from '@nestjs/common';
import { UserMongoService } from '../databases/mongo/services';

@Injectable()
export class UserService extends UserMongoService {}
