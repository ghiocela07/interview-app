
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesResolverService } from '../core/services/employees-resolver.service';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [
    {
        path: 'employees', resolve: [EmployeesResolverService], component: EmployeesComponent,
        children:
            [
                { path: 'new', component: EmployeeEditComponent },
                { path: ':id/edit', component: EmployeeEditComponent,  resolve: [EmployeesResolverService]}
            ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {

}
