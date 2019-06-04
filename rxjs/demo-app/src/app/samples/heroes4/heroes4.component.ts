import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Hero } from '@demo-app/data';
import { Heroes4Service } from './heroes4.service';

@Component({
  selector: 'app-heroes4',
  templateUrl: './heroes4.component.html'
})
export class Heroes4Component implements OnInit {
  // Expose "OBSERVABLE of Heroes" instead of Hero[] with AsyncPipe
  // Note the `$` suffix
  heroes$: Observable<Hero[]>;

  errorMessage: string;

  constructor(private service: Heroes4Service) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.heroes$ = this.service.getHeroes().pipe(
      // CATCH the user friendly message and display it
      catchError(errorMessage => {
        this.errorMessage = errorMessage;
        return []; // return empty list for display
      })
    );
  }

  add() {
    const hero = { id: 6, alias: 'Thor', name: 'Thor Odinson', profile: 'assets/thor.png', description: '' };

    this.service.add(hero).subscribe(
      // Refresh data
      () => this.getData(),

      // Show user-friendly message and display it
      errorMessage => (this.errorMessage = errorMessage)
    );
  }
}
