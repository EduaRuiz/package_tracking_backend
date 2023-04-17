import { Observable } from 'rxjs';
import { ShipmentDomainEntity } from '../entities';

/**
 * Shipment Domain Service interface definition
 * with the methods to be implemented
 *
 * @export
 * @interface IShipmentDomainService
 * @typedef {IShipmentDomainService}
 * @template Entity
 */
export interface IShipmentDomainService<
  Entity extends ShipmentDomainEntity = ShipmentDomainEntity,
> {
  /**
   * Creates a new shipment in the database and returns it
   *
   * @param {Entity} entity The shipment to create
   * @returns {Observable<Entity>} The created shipment
   */
  createShipment(entity: Entity): Observable<Entity>;
  /**
   * Gets a shipment by its id and returns it
   *
   * @param {string} entityId The id of the shipment to get
   * @returns {Observable<Entity>} The shipment with the given id
   */
  getShipmentById(entityId: string): Observable<Entity>;
  /**
   * Gets all shipments and returns them
   *
   * @returns {Observable<Entity[]>} All shipments
   */
  getAllShipments(): Observable<Entity[]>;
  /**
   * Updates a shipment and returns it
   *
   * @param {string} entityId The id of the shipment to update
   * @param {Entity} entity The shipment to update
   * @returns {Observable<Entity>} The updated shipment
   */
  updateShipment(entityId: string, entity: Entity): Observable<Entity>;
  /**
   * Deletes a shipment and returns it
   *
   * @param {string} entityId The id of the shipment to delete
   * @returns {Observable<Entity>} The deleted shipment
   */
  deleteShipment(entityId: string): Observable<Entity>;
}
