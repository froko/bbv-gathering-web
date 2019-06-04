## bbv Gathering 2019

# RxJS

Reactive Extensions for JavaScript.

---

## What is RxJS?

- An API for asynchronous programming with observable streams
- RxJS is the implementation of the Rx spec in JavaScript

+++

## What can RxJS do for me?

- Converting existing code for async operations into observables
- Iterating through the values in a stream
- Mapping values to different types
- Filtering streams
- Composing multiple streams

+++

## What is a stream?

- The occurrence of data over time
- Data can be anything:
  - number
  - object instance
  - XHR response
  - key strokes
  - mouse clicks
  - ...

+++

## What is an observable?

- Represents a stream by the means of the GoF pattern

- 3 methods:

  - `next(item)`
  - `error(error)`
  - `complete()`

- Observables are lazy by default
- Observers subscribe to observables

+++

## Pull vs. Push

<table>
  <tr>
    <th></th>
    <th>Producer</th>
    <th>Consumer</th>
  </tr>
  <tr>
    <td><b>Pull</b></td>
    <td><b>Passive</b>: produces data when requested.</td>
    <td><b>Active</b>: decides when data is requested.</td>
  </tr>
  <tr class="fragment">
    <td><b>Push</b></td>
    <td><b>Active</b>: produces data at its own pace.</td>
    <td><b>Passive</b>: reacts to received data.</td>
  </tr>
</table>

---

## RxJs Basics

- `create()`
- `complete()`
- `unsubscribe()`
- `fromEvent()`

+++

### `create()`

<!-- prettier-ignore -->
```typescript
import { Observable } from 'rxjs';
import { addItem } from './utils';

const observable = Observable.create((observer: any) => {
  observer.next('bbv Gathering 2019');
});

observable.subscribe((x: any) => addItem(x));
```

+++

### `complete()`

<!-- prettier-ignore -->
```typescript
import { Observable } from 'rxjs';
import { addItem } from './utils';

const observable = Observable.create((observer: any) => {
  try {
  observer.next('bbv Gathering 2019');
  observer.next('Web Track');
  observer.complete();
  observer.next('Coffee break');
  } catch(err) {
    observer.error(err);
  }
});

observable.subscribe(
  (x: any) => addItem(x),
  (error: any) => addItem(error),
  () => addItem('Completed.'));
```

+++

### `unsubscribe()`

<!-- prettier-ignore -->
```typescript
import { Observable } from 'rxjs';
import { addItem } from './utils';

const observable = Observable.create((observer: any) => {
  observer.next('bbv Gathering 2019');
  observer.next('Web Track');
  setInterval(() => {
    observer.next('Ongoing Presentation');
  }, 2000)
});

const subscription = observable.subscribe(
  (x: any) => addItem(x)
);

setTimeout(() => {
  subscription.unsubscribe();
}, 6001);
```

+++

### `fromEvent()`

<!-- prettier-ignore -->
```typescript
import { fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { addItem } from './utils';

const observable = fromEvent(document, 'click').pipe(
  pluck('x')
);

observable.subscribe(
  (x: any) => addItem(x)
);
```

---

## RxJS Subjects

- `Subject`
- `BehaviorSubject`
- `ReplaySubject`

+++

### `Subject`

<!-- prettier-ignore -->
```typescript
import { Subject } from 'rxjs';
import { addItem } from './utils';

const subject = new Subject();

subject.subscribe(
  (x: any) => addItem(`Observer 1 received ${x}`));

subject.next('1st thing');
subject.next('2nd thing');
subject.next('3rd thing');

subject.subscribe(
  (x: any) => addItem(`Observer 2 received ${x}`));

subject.next('4th thing');
```

+++

### `BehaviorSubject`

<!-- prettier-ignore -->
```typescript
import { BehaviorSubject } from 'rxjs';
import { addItem } from './utils';

const subject = new BehaviorSubject('1st thing');

subject.subscribe(
  (x: any) => addItem(`Observer 1 received ${x}`));

subject.next('2nd thing');
subject.next('3rd thing');

subject.subscribe(
  (x: any) => addItem(`Observer 2 received ${x}`));

subject.next('4th thing');
```

+++

### `ReplaySubject`

<!-- prettier-ignore -->
```typescript
import { ReplaySubject } from 'rxjs';
import { addItem } from './utils';

const subject = new ReplaySubject();

subject.subscribe(
  (x: any) => addItem(`Observer 1 received ${x}`));

subject.next('1st thing');
subject.next('2nd thing');
subject.next('3rd thing');

subject.subscribe(
  (x: any) => addItem(`Observer 2 received ${x}`));

subject.next('4th thing');
```

---

## Marble Testing

(Demo)

---

## RxJs in Angular

(Demo)

---

## Exercises

@ul[text-08](false)

- Display all Agents, Avengers and Leaders in one list. Implement `MembersService.getAll()`  
  _Hint: You only need two operators..._
- Sort list by member's id.
- Phil Coulson is an Agent and a Leader. Display him only once in the list.
- Make a details view with the name, the profile picture and the description.
- Display a list with the names of the 5 most recent visited members in the members list and detail view.
- Write a marble test for `MembersService.getAll()`
  @ulend

@snap[north-east]
![code](assets/img/code.png)
@snapend

---

## References

@ul[text-06](false)

- https://rxjs-dev.firebaseapp.com/
- https://www.learnrxjs.io/
- https://angular.io/guide/rx-library
- http://reactivex.io/
- https://thinkster.io/tutorials/learn-rxjs-observables/what-is-rxjs
- https://xgrommx.github.io/rx-book/content/which_operator_do_i_use/instance_operators.html
- https://medium.com/@bencabanes/marble-testing-observable-introduction-1f5ad39231c
- https://dev.to/mokkapps/how-i-write-marble-tests-for-rxjs-observables-in-angular-4l0k
  @ulend
