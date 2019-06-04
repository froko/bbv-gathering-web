import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { Member } from '@exercise-app/data';
import { MemberService } from './member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  member$: Observable<Member>;

  constructor(private route: ActivatedRoute, private router: Router, private service: MemberService) {}

  ngOnInit() {}

  navigate(id: number) {
    this.router.navigate(['members', id]);
  }
}
