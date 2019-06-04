// Taken from https://medium.com/@bencabanes/marble-testing-observable-introduction-1f5ad39231c

import { cold, getTestScheduler } from 'jasmine-marbles';
import { delay, filter, take } from 'rxjs/operators';
import { interval, of } from 'rxjs';

describe('Marbe testing with time', () => {
  describe('Interval', () => {
    it('should keep only even numbers', () => {
      const source = interval(10, getTestScheduler()).pipe(
        take(10),
        filter(x => x % 2 === 0)
      );
      const expected = cold('-a-b-c-d-e|', { a: 0, b: 2, c: 4, d: 6, e: 8 });

      expect(source).toBeObservable(expected);
    });
  });

  describe('Delay', () => {
    it('should wait 20 frames before receive the value', () => {
      const scheduler = getTestScheduler();
      const source = of('a').pipe(delay(20, scheduler));
      const expected = cold('--(a|)');

      expect(source).toBeObservable(expected);
    });
  });
});
