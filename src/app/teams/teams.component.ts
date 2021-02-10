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

  constructor(private teamsService: TeamsService) { }

  public ngOnInit(): void {
    this.teams = this.teamsService.getTeams();
  }


}
