import { Observable } from 'rxjs';
import { StatusDomainEntity } from '../entities';

/**
 * Status Domain Service interface definition with the methods to be implemented
 *
 * @export
 * @interface IStatusDomainService
 * @typedef {IStatusDomainService}
 * @template Entity
 */
export interface IStatusDomainService<
  Entity extends StatusDomainEntity = StatusDomainEntity,
> {
  /**
   * Creates a new status in the source and returns it
   *
   * @param {Entity} entity The status to create
   * @returns {Observable<Entity>} The created status
   */
  createStatus(entity: Entity): Observable<Entity>;
  /**
   * Get status by id from the source and returns it
   *
   * @param {string} entityId The id of the status to get
   * @returns {Observable<Entity>} The status with the given id
   */
  getStatus(entityId: string): Observable<Entity>;
  /**
   * Updates status in the source and returns it
   *
   * @param {string} entityId The id of the status to update
   * @param {Entity} entity The status to update
   * @returns {Observable<Entity>} The updated status
   */
  updateStatus(entityId: string, entity: Entity): Observable<Entity>;
  /**
   * Deletes status from the source and returns it
   *
   * @param {string} entityId The id of the status to delete
   * @returns {Observable<Entity>} The deleted status
   */
  deleteStatus(entityId: string): Observable<Entity>;
}
