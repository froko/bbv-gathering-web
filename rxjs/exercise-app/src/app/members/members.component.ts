import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { MemberWithRating } from '../data/model';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members$: Observable<MemberWithRating[]>;

  constructor(private service: MembersService, private router: Router) {}

  ngOnInit() {
    this.members$ = this.service.getAll();
  }

  navigate(id: number) {
    this.router.navigate(['members', id]);
  }
}
