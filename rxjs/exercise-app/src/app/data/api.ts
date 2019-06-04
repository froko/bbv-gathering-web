import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

import { getAgents } from './agents';
import { getAvengers } from './avengers';
import { getLeaders } from './leaders';
import { getRatings } from './ratings';

export class InMemoryDataService implements InMemoryDbService {
  private shieldOrigin = 's.h.i.e.l.d.';
  private confidential = 'confidential';
  private secret = 'top secret';

  createDb() {
    return {
      agents: getAgents(),
      avengers: getAvengers(),
      leaders: getLeaders(),
      ratings: getRatings()
    };
  }

  responseInterceptor(resOptions: ResponseOptions, reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'agents' && !reqInfo.id) {
      const results: any = resOptions.body as any;
      resOptions.body = {
        origin: this.shieldOrigin,
        classification: this.secret,
        count: results ? results.length || 1 : 0,
        agents: results
      };
    }

    if (reqInfo.collectionName === 'avengers' && !reqInfo.id) {
      const results: any = resOptions.body as any;
      resOptions.body = {
        origin: this.shieldOrigin,
        classification: this.confidential,
        count: results ? results.length || 1 : 0,
        avengers: results
      };
    }

    if (reqInfo.collectionName === 'leaders' && !reqInfo.id) {
      const results: any = resOptions.body as any;
      resOptions.body = {
        origin: this.shieldOrigin,
        classification: this.confidential,
        count: results ? results.length || 1 : 0,
        leaders: results
      };
    }

    return resOptions;
  }
}
