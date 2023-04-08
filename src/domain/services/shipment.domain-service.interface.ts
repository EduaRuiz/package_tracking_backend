import { Observable } from 'rxjs';
import { ShipmentDomainEntity } from '../entities';

export interface IShipmentDomainService<
  Entity extends ShipmentDomainEntity = ShipmentDomainEntity,
> {
  createShipment(entity: Entity): Observable<Entity>;
  getShipmentById(entityId: string): Observable<Entity>;
  getAllShipments(): Observable<Entity[]>;
  updateShipment(entityId: string, entity: Entity): Observable<Entity>;
  deleteShipment(entityId: string): Observable<Entity>;
}
