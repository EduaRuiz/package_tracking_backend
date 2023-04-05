import { Observable } from 'rxjs';
import { IStatusDomainService } from 'src/domain/services';
import { StatusMongoRepository } from '../repositories';
import { StatusMongoModel } from '../models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StatusMongoService implements IStatusDomainService {
  constructor(private readonly statusRepository: StatusMongoRepository) {}

  createStatus(entity: StatusMongoModel): Observable<StatusMongoModel> {
    return this.statusRepository.create(entity);
  }
  getStatus(id: string): Observable<StatusMongoModel> {
    return this.statusRepository.findOneById(id);
  }
}
