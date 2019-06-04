import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

import { getHeroes } from './heroes';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return {
      heroes: getHeroes(),
      hero: getHeroes()
    };
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'heroes' && !reqInfo.id) {
      const results: any = resOptions.body as any;
      resOptions.body = {
        origin: 's.h.i.e.l.d',
        classification: 'confidential',
        count: results ? results.length || 1 : 0,
        heroes: results
      };
    }

    return resOptions;
  }
}
