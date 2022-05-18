import { Injectable } from '@angular/core';
import { concatMap, delay, from, of } from "rxjs"
import { applianceEvents } from './appliance-events.mock';

@Injectable({
  providedIn: 'root'
})
export class ApplianceService {
  // Mock of events from appliance. To be replaced with an actual stream from the appliance
  events$ = from(applianceEvents).pipe(concatMap(event => of(event).pipe(delay(50))));
}
