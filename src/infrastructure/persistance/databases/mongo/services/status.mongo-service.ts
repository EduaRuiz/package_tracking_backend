import { Observable } from 'rxjs';
import { IStatusDomainService } from 'src/domain/services';
import { StatusMongoRepository } from '../repositories';
import { StatusMongoModel } from '../models';
import { Injectable } from '@nestjs/common';
import { StatusDomainEntity } from 'src/domain/entities';

@Injectable()
export class StatusMongoService implements IStatusDomainService {
  constructor(private readonly statusRepository: StatusMongoRepository) {}

  updateStatus(
    entityId: string,
    entity: StatusDomainEntity,
  ): Observable<StatusDomainEntity> {
    return this.statusRepository.update(entityId, entity);
  }

  deleteStatus(entityId: string): Observable<StatusDomainEntity> {
    return this.statusRepository.delete(entityId);
  }

  createStatus(entity: StatusMongoModel): Observable<StatusMongoModel> {
    return this.statusRepository.create(entity);
  }

  getStatus(id: string): Observable<StatusMongoModel> {
    return this.statusRepository.findOneById(id);
  }
}
