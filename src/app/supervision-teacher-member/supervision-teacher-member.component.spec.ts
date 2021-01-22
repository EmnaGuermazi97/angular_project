import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisionTeacherMemberComponent } from './supervision-teacher-member.component';

describe('SupervisionTeacherMemberComponent', () => {
  let component: SupervisionTeacherMemberComponent;
  let fixture: ComponentFixture<SupervisionTeacherMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupervisionTeacherMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisionTeacherMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
