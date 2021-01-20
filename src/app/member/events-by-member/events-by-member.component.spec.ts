import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsByMemberComponent } from './events-by-member.component';

describe('EventsByMemberComponent', () => {
  let component: EventsByMemberComponent;
  let fixture: ComponentFixture<EventsByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
