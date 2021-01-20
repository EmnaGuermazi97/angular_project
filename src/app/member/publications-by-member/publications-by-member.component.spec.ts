import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationsByMemberComponent } from './publications-by-member.component';

describe('PublicationsByMemberComponent', () => {
  let component: PublicationsByMemberComponent;
  let fixture: ComponentFixture<PublicationsByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationsByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
