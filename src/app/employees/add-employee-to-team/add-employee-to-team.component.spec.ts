import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeeToTeamComponent } from './add-employee-to-team.component';

describe('AddEmployeeToTeamComponent', () => {
  let component: AddEmployeeToTeamComponent;
  let fixture: ComponentFixture<AddEmployeeToTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEmployeeToTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEmployeeToTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
