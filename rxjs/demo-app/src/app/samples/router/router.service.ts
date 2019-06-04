import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero, UrlService } from '@demo-app/data';

@Injectable({
  providedIn: 'root'
})
export class RouterService {
  constructor(private http: HttpClient, private urlService: UrlService) {}

  getHero(id: number): Observable<Hero> {
    const url = `${this.urlService.url}/${id}`;

    return this.http.get<Hero>(url).pipe(
      // RxJS operators
      catchError(err => {
        if (err.status === 404) {
          return of(undefined); // OK if not found.
        }

        // log HTTP error and ...
        console.error('GET failed', err);
        // rethrow as a user-friendly message
        const message = "Sorry, we can't get heroes right now; please try again later.";
        return throwError(message);
      })
    );
  }
}
