import { Component, OnInit } from '@angular/core';

import { Hero } from '@demo-app/data';
import { Heroes3Service } from './heroes3.service';

@Component({
  selector: 'app-heroes3',
  templateUrl: './heroes3.component.html'
})
export class Heroes3Component implements OnInit {
  heroes: Hero[];
  errorMessage: string;

  constructor(private service: Heroes3Service) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getHeroes().subscribe(
      // Service gives us what we want ...heroes
      heroes => (this.heroes = heroes),

      // Show user-friendly message and display it
      errorMessage => (this.errorMessage = errorMessage)
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
