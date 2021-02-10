import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Team } from 'src/app/core/models/team.model';
import { TeamsService } from 'src/app/core/services/teams.service';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit {

  public team: Team | undefined;
  public id = 0;

  constructor(private route: ActivatedRoute,
              private teamService: TeamsService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.team = this.teamService.getTeam(this.id);
      }
    );
  }
}
