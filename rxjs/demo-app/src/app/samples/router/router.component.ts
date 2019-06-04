import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';

import { Hero } from '@demo-app/data';
import { RouterService } from './router.service';

@Component({
  selector: 'app-router',
  templateUrl: './router.component.html',
  styleUrls: ['./router.component.css']
})
export class RouterComponent implements OnInit, OnDestroy {
  hero$: Observable<Hero>;

  private currentId: number;
  private onDestroy$ = new Subject<void>();

  constructor(private service: RouterService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.listenToRouteParams();
    this.listenToRouterEvents();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    console.log('RouterComponent destroyed.');
  }

  private listenToRouteParams() {
    this.hero$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        return this.service.getHero(id ? +id : 1).pipe(tap(hero => (this.currentId = hero ? hero.id : 0)));
      })
    );
  }

  nextHero() {
    this.navigate(this.currentId + 1);
  }

  previousHero() {
    this.navigate(this.currentId - 1);
  }

  navigate(id: number) {
    id = id || 1;
    this.router.navigate(['router', id]);
  }

  private listenToRouterEvents() {
    // Listen to the router do its thing
    this.router.events.pipe(takeUntil(this.onDestroy$)).subscribe(event => {
      console.log('Router event: ', event);
    });

    console.log('RouterComponent initialized.');
  }
}
