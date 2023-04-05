import { Observable } from 'rxjs';

/**
 * Interface for the base repository methods that will be implemented by the concrete repositories
 *
 * @export
 * @interface IRepositoryBase
 * @template Entity
 */
export interface IRepositoryBase<Entity> {
  /**
   * Creates an entity in the database and returns the created entity
   *
   * @param {Entity} entity The entity to be created
   * @return {Observable<Entity>} The created entity
   * @memberof IRepositoryBase
   */
  create(entity: Entity): Observable<Entity>;

  /**
   * Updates an entity in the database and returns the updated entity
   *
   * @param {string} entityId The id of the entity to be updated
   * @param {Entity} entity The entity to be updated
   * @return {Observable<Entity>} The updated entity
   * @memberof IRepositoryBase
   */
  update(entityId: string, entity: Entity): Observable<Entity>;

  /**
   * Deletes an entity in the database and returns the deleted entity
   *
   * @param {string} entityId The id of the entity to be deleted
   * @return {Observable<Entity>} The deleted entity
   * @memberof IRepositoryBase
   */
  delete(entityId: string): Observable<Entity>;

  /**
   * Finds all entities in the database and returns them
   *
   * @return {Observable<Entity[]>} The found entities
   * @memberof IRepositoryBase
   */
  findAll(): Observable<Entity[]>;

  /**
   * Finds an entity by its id and returns it
   *
   * @param {string} entityId The id of the entity to be found
   * @return {Observable<Entity>} The found entity
   * @memberof IRepositoryBase
   */
  findOneById(entityId: string): Observable<Entity>;
}
