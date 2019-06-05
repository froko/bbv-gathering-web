import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastVisitedComponent } from './last-visited.component';

describe('LastVisitedComponent', () => {
  let component: LastVisitedComponent;
  let fixture: ComponentFixture<LastVisitedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastVisitedComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastVisitedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
