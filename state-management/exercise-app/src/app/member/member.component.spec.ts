import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { MembersService } from '../members/members.service';

import { ActivatedRouteStub } from './activated-route.stub';
import { MemberComponent } from './member.component';
import { MemberService } from './member.service';

describe('MemberComponent', () => {
  let component: MemberComponent;
  let fixture: ComponentFixture<MemberComponent>;

  const memberService = jasmine.createSpyObj('MemberService', ['getById']);
  const membersService = jasmine.createSpyObj('MembersService', ['getMostRecentVisitedMembers']);
  const router = jasmine.createSpyObj('Router', ['navigate']);
  const activatedRoute = new ActivatedRouteStub();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MemberComponent],
      providers: [
        { provide: MemberService, useValue: memberService },
        { provide: MembersService, useValue: membersService },
        { provide: Router, useValue: router },
        { provide: ActivatedRoute, useValue: activatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    activatedRoute.setParamMap({ id: 2 });

    fixture = TestBed.createComponent(MemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
