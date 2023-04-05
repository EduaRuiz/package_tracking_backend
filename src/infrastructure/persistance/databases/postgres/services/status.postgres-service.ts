import { Observable } from 'rxjs';
import { IStatusDomainService } from 'src/domain/services';
import { StatusPostgresRepository } from '../repositories';
import { StatusPostgresEntity } from '../entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusPostgresService implements IStatusDomainService {
  constructor(private readonly statusRepository: StatusPostgresRepository) {}

  createStatus(entity: StatusPostgresEntity): Observable<StatusPostgresEntity> {
    return this.statusRepository.create(entity);
  }
  getStatus(id: string): Observable<StatusPostgresEntity> {
    return this.statusRepository.findOneById(id);
  }
}
