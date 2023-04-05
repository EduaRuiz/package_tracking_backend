import { Injectable } from '@nestjs/common';
import { UserPostgresService } from '../databases/postgres/services/user.postgres-service';

@Injectable()
export class UserService extends UserPostgresService {}
