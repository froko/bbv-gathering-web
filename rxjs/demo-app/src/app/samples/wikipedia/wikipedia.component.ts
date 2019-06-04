import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { EMPTY, Observable } from 'rxjs';

import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { WikipediaService, WikiResult } from './wikipedia.service';

@Component({
  selector: 'app-wikipedia',
  templateUrl: './wikipedia.component.html'
})
export class WikipediaComponent {
  // FormControl gives access to changes in the search box
  searchTerm = new FormControl();
  errorMessage = '';

  // Listen for search box value changes
  searchTerms$: Observable<string> = this.searchTerm.valueChanges;

  // Turn Observable of search values into Observable of Wikipedia results
  articles$ = this.searchTerms$.pipe(
    tap(() => (this.errorMessage = '')), // clear previous error (if any)
    debounceTime(1000), // wait for typing to stop
    distinctUntilChanged(), // only if different than last time

    // Try search. Discard an in-flight search (if any).
    switchMap(searchTerm =>
      this.service.search(searchTerm).pipe(
        // Catch and recover from search error here.
        // If try to recover later, `searchTerm` observable completes
        catchError(err => {
          this.errorMessage = err.message;
          return EMPTY; // return to happy path with empty list
        })
      )
    ),

    map(this.makePretty)
  );

  constructor(private service: WikipediaService) {}

  private makePretty(list: WikiResult[]): WikiResult[] {
    return list.length === 0 ? [{ title: 'No results' }] : list;
  }
}
