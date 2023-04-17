import { Observable } from 'rxjs';
import { IStatusDomainService } from 'src/domain/services';
import { StatusMongoRepository } from '../repositories';
import { StatusMongoModel } from '../models';
import { Injectable } from '@nestjs/common';
import { StatusDomainEntity } from 'src/domain/entities';

/**
 * Status Mongo Service class
 *
 * @export
 * @class StatusMongoService
 * @typedef {StatusMongoService}
 * @implements {IStatusDomainService}
 */
@Injectable()
export class StatusMongoService implements IStatusDomainService {
  /**
   * Creates an instance of StatusMongoService.
   *
   * @constructor
   * @param {StatusMongoRepository} statusRepository The status Mongo repository
   */
  constructor(private readonly statusRepository: StatusMongoRepository) {}

  /**
   * Updates a status
   *
   * @param {string} entityId The status id to update
   * @param {StatusDomainEntity} entity The status to update
   * @returns {Observable<StatusDomainEntity>} The status updated
   */
  updateStatus(
    entityId: string,
    entity: StatusDomainEntity,
  ): Observable<StatusDomainEntity> {
    return this.statusRepository.update(entityId, entity);
  }

  /**
   * Deletes a status
   *
   * @param {string} entityId The status id to delete
   * @returns {Observable<StatusDomainEntity>} The status deleted
   */
  deleteStatus(entityId: string): Observable<StatusDomainEntity> {
    return this.statusRepository.delete(entityId);
  }

  /**
   * Creates a status
   *
   * @param {StatusMongoModel} entity The status to create
   * @returns {Observable<StatusMongoModel>} The status created
   */
  createStatus(entity: StatusMongoModel): Observable<StatusMongoModel> {
    return this.statusRepository.create(entity);
  }

  /**
   * Get a status by id
   *
   * @param {string} id The status id to get
   * @returns {Observable<StatusMongoModel>} The status found
   */
  getStatus(id: string): Observable<StatusMongoModel> {
    return this.statusRepository.findOneById(id);
  }
}
