import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Team } from '../core/models/team.model';
import { EmployeeService } from '../core/services/employee.service';
import { TeamsService } from '../core/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  public teams: Team[] = [];

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      try {
        this.teams = data.teams;
      }
      catch (error) {

      }
    });
  }
}
