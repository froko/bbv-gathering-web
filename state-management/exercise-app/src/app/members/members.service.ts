import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { forkJoin, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { AgentResource, AvengerResource, LeaderResource, Member, MemberWithRating, Rating } from '@exercise-app/data';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  private mostRecentVisitedList: Member[] = [];

  constructor(private http: HttpClient) {}

  getAll(): Observable<MemberWithRating[]> {
    const agents$ = this.http.get<AgentResource>('api/agents').pipe(map(r => r.agents));
    const avengers$ = this.http.get<AvengerResource>('api/avengers').pipe(map(r => r.avengers));
    const leaders$ = this.http.get<LeaderResource>('api/leaders').pipe(map(r => r.leaders));
    const ratings$ = this.http.get<Rating[]>('api/ratings');

    const members$ = forkJoin(agents$, avengers$, leaders$).pipe(
      map(members => members[0].concat(members[1]).concat(members[2]))
    ) as Observable<any[]>;

    const membersWithRatings$ = forkJoin(members$, ratings$).pipe(
      map(this.asMemberWithRating),
      map(this.distinct),
      map(members => members.sort(this.sortById))
    ) as Observable<MemberWithRating[]>;

    return membersWithRatings$;
  }

  getMostRecentVisitedMembers(): Observable<Member[]> {
    return of(this.mostRecentVisitedList);
  }

  updateMostRecentVisitedList(member: Member): void {
    if (this.mostRecentVisitedList.filter(m => m.id === member.id).length === 0) {
      this.mostRecentVisitedList = [member, ...this.mostRecentVisitedList];
    }
  }

  asMemberWithRating(data: [any[], Rating[]]): MemberWithRating[] {
    const members = data[0];
    const ratings = data[1];

    return members.map(member => ({
      id: member.id,
      name: member.name,
      profile: member.profile,
      level: member.level,
      rating: ratings.find(r => r.id === member.id).numberOfStars
    }));
  }

  distinct(members: MemberWithRating[]): MemberWithRating[] {
    return Array.from(new Set(members.map(member => member.id))).map(id => members.find(member => member.id === id));
  }

  sortById(member1: MemberWithRating, member2: MemberWithRating): number {
    if (member1.id < member2.id) {
      return -1;
    }

    if (member1.id > member2.id) {
      return 1;
    }

    return 0;
  }
}
