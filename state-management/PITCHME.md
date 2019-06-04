## bbv Gathering 2019

# State Management

How to handle application state in large and complex Angular applications.

---

## What is state anyway?

@ul

- UI state (dropdowns, selected tabs, spinners, pagination controls etc.)
- Authentication state
- Router state
- User Input
- Server responses or cached data
- ...
  @ulend

---

## Problems

@ul

- SPA can become very complex
- Managing ever-changing state is hard
- Model can update model, view can update model, model update can cause view to update, ...
- If a system is opaque and non-deterministic, it's hard to reproduce bugs
  @ulend

---

## Simple Application

![simple](assets/img/SimpleApp.png)

---

## Complex Application

![complex](assets/img/ComplexApp.png)

---

## How to deal with this?

@ul

- Container vs. Presentational Components (aka. Smart vs. Dumb Components)
- Services with Subject
- Event Bus
- State Management Library
  @ulend

---

## Component architecture

![architecture](assets/img/ComponentArchitecture.png)

+++

## Container Component (aka. Smart Component)

- Knows how to retrieve and handle data
- Composes presentational components
- Delivers data to presentational components via `@Input` (no Observables!)
- Reacts on events from presentational components via `@Output`

+++

## Presentational Component (aka. Dumb Component)

- Does not have any dependency (no constructor)
- Makes things look pretty
- Only relies on `@Input` and `@Output`
- `ChangeDetectionStrategy.OnPush`

+++

## Quick wins

- Better architecture, of course! ;-)
- Reduces amount of components that talk to a service
- Reduces complexity
- Better testing

+++

## Exercises

- Pull out a `MembersListComponent` and a `LastVisitedComponent` as Presentational Components.
- Use `@Input` and `@Output` parameters.
- Reuse `LastVisitedComponent` in the details view.

@snap[north-east]
![code](assets/img/code.png)
@snapend

---

## Services with Subject

- Services expose 1 or more observables
- Methods return `void`
- Methods push data to observables
- Multiple components can subscribe to the same observable
- Reduces complexity

+++

## `todo.service.ts`

<!-- prettier-ignore -->
```typescript
export class CustomerService {
  private state$: BehaviorSubject<Customer[]>;

  constructor(private http: HttpClient) {}

  customers$ = this.state$.asObservable();

  loadAll(): void {
    this.http
      .get<Customer[]>('api/customers')
      .subscribe(c => this.state$.next(c));
  }

  loadPremium(): void {
    this.http
      .get<Customer[]>('api/customers')
      .subscribe(c => this.state$.next(c.filter(c => c.isPremium)));
  }
}
```

+++

## `todo.component.ts`

<!-- prettier-ignore -->
```typescript
export class CustomersComponent implements OnInit {
  customers$: Observable<Customer[]>;

  constructor(private service: CustomerService) {}

  ngOnInit() {
    this.customers$ = this.service.customers$;
    this.service.loadAll();
  }

  onShowPremium() {
    this.service.loadPremium();
  }
}
```

---

## EventBus

- Facilitates inter-component communication
- Somehow message-driven
- Multiple components subscribe to observable of EventBus

+++

## `eventbus.service.ts`

<!-- prettier-ignore -->
```typescript
export class EventBusService {
  private subject$ = new Subject();

  emit(event: EmitEvent) {
    this.subject$.next(event);
  }

  on(event: Events, action: any): Subscription {
    return this.subject$
      .pipe(
        filter((e: EmitEvent) => e.name === event),
        map((e: EmitEvent) => e.value)
      ).subscribe(action);
  }
}
```

+++

## Send data

<!-- prettier-ignore -->
```typescript
export class CustomersListComponent {
  constructor(private bus: EventBusService) {}

  selectCustomer(cust: Customer) {
    this.bus.emit(
      new EmitEvent(Events.CustomerSelected, cust));
  }
}
```

+++

## Receive data

<!-- prettier-ignore -->
```typescript
export class HeaderComponent implements OnInit, OnDestroy {
  customer: Customer;

  private subscription: Subscription;

  constructor(private bus: EventBusService) {}

  ngOnInit() {
    this.subscription = this.bus.on(
      Events.CustomerSelected,
      cust => (this.customer = cust));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

+++

## Exercises

- Refactor `MembersService` to be a Service with a Subject.
- Use the EventBus to display the most recent visited members.

@snap[north-east]
![code](assets/img/code.png)
@snapend

---

## State Management Libraries

- ngrx
- ngxs
- akita
- ...

---

![ngxs](assets/img/ngxs.png)

- Single source of truth for application state
- Simple rules for predictable state mutations
- CQRS in mind
- Less boilerplate code than ngrx
- Uses modern TypeScript features like classes and decoraters

+++

![ngxs](assets/img/ngxs.png)

- Actions
- State / Store
- Selectors

+++

## Installation

`npm install @ngxs/store --save`

<!-- prettier-ignore -->
```typescript
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [
    NgxsModule.forRoot([ZooState])
  ]
})
export class AppModule {}
```

+++

## Actions

<!-- prettier-ignore -->
```typescript
export class FeedZebra {
  static readonly type = '[Zoo] Feed Zebra';
  constructor(public name: string, public hayAmount: number) {}
}
```

+++

## Dispatching actions

<!-- prettier-ignore -->
```typescript
import { Store } from '@ngxs/store';
import { AddAnimal } from './animal.actions';

@Component({ ... })
export class ZooComponent {
  constructor(private store: Store) {}

  feedZebra(name: string) {
    this.store.dispatch(new FeedZebra(name, 10));
  }
}
```

+++

## State (1)

<!-- prettier-ignore -->
```typescript
export interface ZebraFood {
  name: string;
  hay: number;
  carrots: number;
}

export class FeedZebra {
  static readonly type = '[Zoo] FeedZebra';
  constructor(public zebraToFeed: ZebraFood) {}
}

export interface ZooStateModel {
  zebraFood: ZebraFood[];
}
```

+++

## State (2)

<!-- prettier-ignore -->
```typescript
import { State, Action, StateContext } from '@ngxs/store';

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    zebraFood: []
  }
})
export class ZooState {
  @Action(FeedZebra)
  feedZebra(ctx: StateContext<ZooStateModel>, action: FeedZebra) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      zebraFood: [
        ...state.zebraFood,
        // this is the new ZebraFood instance that we add to the state
        action.zebraToFeed,
      ]
    });
  }
}
```

+++

## State (3)

<!-- prettier-ignore -->
```typescript
import { State, Action, StateContext } from '@ngxs/store';
import { AnimalsService } from './animals.service';

@State<ZooStateModel>({
  name: 'zoo',
  defaults: {
    animals: []
  }
})
export class ZooState {
  constructor(private service: AnimalsService) {}

  @Action(LoadAnimals)
  loadAnimals(ctx: StateContext<ZooStateModel>, action: LoadAnimals) {
    const state = ctx.getState();

    return this.service.loadAll().pipe(
      tap(animals => {
        ctx.setState({
          ...state,
          animals
        })
      })
    );
  }
}
```

+++

## Selectors (1)

<!-- prettier-ignore -->
```typescript
import { Select } from '@ngxs/store';
import { ZooState, ZooStateModel } from './zoo.state';

@Component({ ... })
export class ZooComponent {
  // Reads the name of the state from the state class
  @Select(ZooState) animals$: Observable<string[]>;

  // Uses the pandas memoized selector to only return pandas
  @Select(ZooState.pandas) pandas$: Observable<string[]>;

  // Also accepts a function like our select method
  @Select(state => state.zoo.animals) animals$: Observable<string[]>;

  // Reads the name of the state from the parameter
  @Select() zoo$: Observable<ZooStateModel>;
}
```

+++

## Selectors (2)

<!-- prettier-ignore -->
```typescript
import { State, Selector } from '@ngxs/store';

@State<string[]>({
  name: 'animals',
  defaults: []
})
export class ZooState {

  @Selector() 
  static pandas(state: string[]) {
    return state.filter(s => s.indexOf('panda') > -1);
  }

}
```

+++

## Exercises

- Build a store which holds all members and the most recent visited members.
- Dispatch actions to load all members and store the last visited member.
- Replace the service dependency in all container components with the store dependency.
- Use selectors to display data.
- _Reference: https://ngxs.gitbook.io/_

@snap[north-east]
![code](assets/img/code.png)
@snapend

---

## References

@ul[text-06](false)

- [Dan Whalin - Mastering the Subject](https://www.youtube.com/watch?v=_q-HL9YX_pk)
- [Jesse Sanders - I am not ready for NgRx](https://www.youtube.com/watch?v=mYZivgSCVGw)
- [ngAir 153 - NGXS: A New State Management for Angular Apps](https://www.youtube.com/watch?v=rkn73khwfWU)
- https://ngxs.gitbook.io/

@ulend
