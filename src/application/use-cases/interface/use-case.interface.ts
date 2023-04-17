import { Observable } from 'rxjs';

/**
 * Interface for use cases
 *
 * @export
 * @interface IUseCase
 * @typedef {IUseCase}
 */
export interface IUseCase {
  /**
   * Description placeholder
   *
   * @param {...any[]} args Arguments to execute
   * @returns {Observable<any>}
   */
  execute(...args: any[]): Observable<any>;
}
