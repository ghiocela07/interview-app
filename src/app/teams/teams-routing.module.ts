
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesResolverService } from '../core/services/employees-resolver.service';
import { TeamResolverService } from '../core/services/team-resolver.service';
import { TeamsResolverService } from '../core/services/teams-resolver.service';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { TeamsComponent } from './teams.component';


const routes: Routes = [
    {
        path: 'teams', component: TeamsComponent,  resolve: {teams: TeamsResolverService}, children:
        [
            { path: ':id', component: TeamDetailsComponent, resolve: {team: TeamResolverService}}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TeamsRoutingModule {

}
