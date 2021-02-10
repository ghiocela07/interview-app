import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovalItemDisplayComponent } from './approval-item-display.component';

describe('ApprovalItemDisplayComponent', () => {
  let component: ApprovalItemDisplayComponent;
  let fixture: ComponentFixture<ApprovalItemDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovalItemDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalItemDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
