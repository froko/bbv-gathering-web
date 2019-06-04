import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero, HeroResource, UrlService } from '@demo-app/data';

@Injectable({
  providedIn: 'root'
})
export class Heroes4Service {
  constructor(private http: HttpClient, private urlService: UrlService) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<HeroResource>(this.urlService.url).pipe(
      // RxJS operators
      catchError(err => {
        // log HTTP error and ...
        console.error('GET failed', err);
        // rethrow as a user-friendly message
        const message = "Sorry, we can't get heroes right now; please try again later.";
        return throwError(message);
      }),

      // extract the Heroes from the API's data object
      map((data: HeroResource) => data.heroes)
    );
  }

  add(hero: Hero): Observable<HeroResource> {
    return this.http.post<HeroResource>(this.urlService.url, hero).pipe(
      catchError(err => {
        // log HTTP error and ...
        console.error('POST failed', err);
        // rethrow as a user-friendly message
        const message = "Sorry, we can't add heroes right now; please try again later";
        return throwError(message);
      })
    );
  }
}
