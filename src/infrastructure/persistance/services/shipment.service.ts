import { ShipmentPostgresService } from '../databases/postgres/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentService extends ShipmentPostgresService {}
