import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';
import { TeamsService } from './teams.service';


@Injectable({ providedIn: 'root' })
export class TeamsResolverService implements Resolve<Team[]> {
    constructor(private teamService: TeamsService, private employeeService: EmployeeService,
                private notificationService: NotificationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Team[] | Observable<Team[]> {
        const teams = this.teamService.getTeams();
        if (teams.length === 0) {
           return  this.teamService.getTeamsFromApi();
        }

        return teams;
    }
}
