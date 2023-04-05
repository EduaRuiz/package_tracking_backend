import { Injectable } from '@nestjs/common';
import { UserPostgresService } from '../databases/postgres/services/user.postgres-service';
import { UserMongoService } from '../databases/mongo/services';

@Injectable()
export class UserService extends UserMongoService {}
