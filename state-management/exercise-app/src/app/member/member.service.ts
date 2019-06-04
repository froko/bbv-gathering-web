import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { find, flatMap, map } from 'rxjs/operators';

import { AgentResource, AvengerResource, LeaderResource, Member } from '@exercise-app/data';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getMember(id: number): Observable<Member> {
    const agents$ = this.http.get<AgentResource>('api/agents').pipe(map(r => r.agents as Member[]));
    const avengers$ = this.http.get<AvengerResource>('api/avengers').pipe(map(r => r.avengers as Member[]));
    const leaders$ = this.http.get<LeaderResource>('api/leaders').pipe(map(r => r.leaders as Member[]));

    const member$ = forkJoin(agents$, avengers$, leaders$).pipe(
      map(members => members[0].concat(members[1]).concat(members[2])),
      flatMap(m => m),
      find(m => m.id === id)
    ) as Observable<Member>;

    return member$;
  }
}
