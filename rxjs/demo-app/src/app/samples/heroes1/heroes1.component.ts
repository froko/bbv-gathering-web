import { Component, OnInit } from '@angular/core';

import { Hero } from '@demo-app/data';
import { Heroes1Service } from './heroes1.service';

@Component({
  selector: 'app-heroes1',
  templateUrl: './heroes1.component.html'
})
export class Heroes1Component implements OnInit {
  heroes: Hero[];

  constructor(private service: Heroes1Service) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.service.getHeroes().subscribe(resource => (this.heroes = resource.heroes));
  }
}
