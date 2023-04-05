import { Observable } from 'rxjs';

export interface IUseCase {
  execute(...args: any[]): Observable<any>;
}
