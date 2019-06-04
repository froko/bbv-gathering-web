import { Observable } from 'rxjs';
import { addItem } from './utils';

const observable = Observable.create((observer: any) => {
  observer.next('bbv Gathering 2019');
});

observable.subscribe((x: any) => addItem(x));
