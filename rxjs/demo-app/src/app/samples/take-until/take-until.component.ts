import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TakeUntilService } from './take-until.service';

let counter = 0;

@Component({
  selector: 'app-take-until',
  templateUrl: './take-until.component.html'
})
export class TakeUntilComponent implements OnInit, OnDestroy {
  time: string;
  time$: Observable<string>;

  // #1 - create a Notifier subject
  private onDestroy$ = new Subject<void>();

  constructor(private service: TakeUntilService) {}

  ngOnInit() {
    counter += 1;
    this.time$ = this.service.time$(`TakeUntilComponent ${counter}`);
    this.time$
      .pipe(
        // #3 Pipe notifier into `takeUntil()`
        takeUntil(this.onDestroy$)
      )
      .subscribe(
        time => (this.time = time),
        err => console.error(err),
        () => console.log(`TakeUntilComponent ${counter} completed.`)
      );
  }

  // #2 Call next() on the notifier when component dies
  ngOnDestroy() {
    this.onDestroy$.next();
    console.log(`TakeUntilComponent ${counter} destroyed.`);
  }
}
