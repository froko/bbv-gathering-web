import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface WikiResult {
  title: string;
  desc?: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WikipediaService {
  constructor(private jsonp: Jsonp) {}

  search(term: string): Observable<WikiResult[]> {
    if (term.length < 2) {
      return of([]);
    }

    const wikiUrl = 'http://en.wikipedia.org/w/api.php';

    const params = new URLSearchParams();
    params.set('search', term); // the user's search value
    params.set('action', 'opensearch');
    params.set('format', 'json');
    params.set('callback', 'JSONP_CALLBACK');

    return this.jsonp.get(wikiUrl, { search: params }).pipe(
      catchError(e => {
        console.error(e);
        // "user-friendly error"
        throw new Error('Server error; please contact support');
      }),
      map(result => result.json()),
      map(result =>
        result[1].reduce(
          (acc: WikiResult[], title, index) =>
            acc.concat({
              title,
              desc: result[2][index],
              url: result[3][index]
            }),
          []
        )
      )
    );
  }
}
