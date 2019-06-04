import { Injectable } from '@angular/core';

import { interval } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TakeUntilService {
  time$(label = '') {
    return interval(500).pipe(
      take(40), // fail safe, stop emitting after ~20 secs

      tap(counter => {
        if (counter === 0) {
          console.log(`${label} TimeService timer started`);
        } else if (counter === 39) {
          console.log(`${label} TimeService self-completes after 20 seconds`);
        }
      }),

      map(() => new Date().toLocaleTimeString()), // return time as a string

      tap(time => console.log(`${label} time`, time), null, () => console.log(`${label} TimeService timer completed`))
    );
  }
}
