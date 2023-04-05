import { Observable } from 'rxjs';
import { StatusDomainEntity } from '../entities';

export interface IStatusDomainService<
  Entity extends StatusDomainEntity = StatusDomainEntity,
> {
  createStatus(entity: Entity): Observable<Entity>;
  getStatus(id: string): Observable<Entity>;
}
