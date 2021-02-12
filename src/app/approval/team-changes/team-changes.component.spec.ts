import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamChangesComponent } from './team-changes.component';

describe('TeamChangesComponent', () => {
  let component: TeamChangesComponent;
  let fixture: ComponentFixture<TeamChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
