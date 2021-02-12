import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model';
import { TeamsService } from './teams.service';


@Injectable({ providedIn: 'root' })
export class TeamsResolverService implements Resolve<Team[]> {
    constructor(private teamService: TeamsService) { }

    public async resolve(route: ActivatedRouteSnapshot): Promise<Team[]> {
        try {
            return await this.teamService.getTeams();
        }
        catch (error) {
            throw (error);
        }

    }
}
