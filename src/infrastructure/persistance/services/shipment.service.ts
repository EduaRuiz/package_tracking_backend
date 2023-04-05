import { ShipmentMongoService } from '../databases/mongo/services';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ShipmentService extends ShipmentMongoService {}
