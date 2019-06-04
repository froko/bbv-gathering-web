import { Component, OnInit } from '@angular/core';

import { Hero } from '@demo-app/data';
import { Heroes2Service } from './heroes2.service';

@Component({
  selector: 'app-heroes2',
  templateUrl: './heroes2.component.html'
})
export class Heroes2Component implements OnInit {
  heroes: Hero[];
  errorMessage: string;

  constructor(private service: Heroes2Service) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getHeroes().subscribe(
      resource => (this.heroes = resource.heroes),

      // Report errors in this 2nd subscribe parameter
      err => (this.errorMessage = err.statusText)
    );
  }

  add() {
    const hero = { id: 6, alias: 'Thor', name: 'Thor Odinson', profile: 'assets/thor.png', description: '' };

    this.service.add(hero);
    this.getData();
  }
}
