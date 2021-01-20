import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsByMemberComponent } from './tools-by-member.component';

describe('ToolsByMemberComponent', () => {
  let component: ToolsByMemberComponent;
  let fixture: ComponentFixture<ToolsByMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolsByMemberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsByMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
