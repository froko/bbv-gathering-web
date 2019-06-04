import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Member } from '@exercise-app/data';
import { MembersService } from '../members/members.service';
import { MemberService } from './member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member$: Observable<Member>;
  mostRecentVisitedMembers$: Observable<Member[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private memberService: MemberService,
    private membersService: MembersService
  ) {}

  ngOnInit() {
    this.member$ = this.route.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id => {
        return this.memberService.getMember(+id);
      }),
      tap(member => this.membersService.updateMostRecentVisitedList(member)),
      tap(() => (this.mostRecentVisitedMembers$ = this.membersService.getMostRecentVisitedMembers()))
    );
  }

  navigate(id: number) {
    this.router.navigate(['members', id]);
  }
}
