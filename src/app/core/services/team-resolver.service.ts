import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamsService } from './teams.service';


@Injectable({ providedIn: 'root' })
export class TeamResolverService implements Resolve<Team | undefined> {
    constructor(private teamService: TeamsService) { }

    public async resolve(route: ActivatedRouteSnapshot): Promise<Team | undefined> {

        return await this.teamService.getTeam(+route.params.id);

    }
}
