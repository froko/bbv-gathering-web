import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { MemoryLeakService } from './memory-leak.service';

let counter = 0;

@Component({
  selector: 'app-memory-leak',
  templateUrl: './memory-leak.component.html'
})
export class MemoryLeakComponent implements OnInit, OnDestroy {
  time: string;
  time$: Observable<string>;

  constructor(private service: MemoryLeakService) {}

  ngOnInit() {
    counter += 1;
    this.time$ = this.service.time$(`MemoryLeakComponent ${counter}`);
    this.time$.subscribe(
      time => (this.time = time),
      err => console.error(err),
      () => console.log(`MemoryLeakComponent ${counter} completed.`)
    );
  }

  ngOnDestroy() {
    console.log(`MemoryLeakComponent ${counter} destroyed.`);
  }
}
