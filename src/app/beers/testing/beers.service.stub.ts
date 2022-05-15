import { EMPTY, Observable } from 'rxjs';
import { Beer } from '../models';

export class BeersServiceStub {

  getList(): Observable<Beer[]> {
    return EMPTY;
  }

  getOne(beerId: number | string): Observable<Beer> {
    return EMPTY;
  }
}
