
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesResolverService } from '../core/services/employees-resolver.service';
import { TeamsResolverService } from '../core/services/teams-resolver.service';
import { ApprovalComponent } from './approval.component';



const routes: Routes = [
    {
        path: 'approval', component: ApprovalComponent, resolve: [EmployeesResolverService, TeamsResolverService]
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class ApprovalRoutingModule {

}
