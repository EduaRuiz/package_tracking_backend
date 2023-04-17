import { ShipmentMongoService } from '../databases/mongo/services';
import { Injectable } from '@nestjs/common';

/**
 * Shipment Service class
 *
 * @export
 * @class ShipmentService
 * @typedef {ShipmentService}
 * @extends {ShipmentMongoService}
 */
@Injectable()
export class ShipmentService extends ShipmentMongoService {}
