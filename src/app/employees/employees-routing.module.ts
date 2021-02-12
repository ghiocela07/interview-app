
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employee } from '../core/models/employee.model';
import { EmployeeResolverService } from '../core/services/employee-resolver.service';
import { EmployeesResolverService } from '../core/services/employees-resolver.service';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesComponent } from './employees.component';


const routes: Routes = [
    {
        path: 'employees', resolve: {employees: EmployeesResolverService}, component: EmployeesComponent,
        children:
            [
                { path: 'new', component: EmployeeEditComponent, resolve: { employeeData: EmployeeResolverService}},
                { path: ':id/edit', component: EmployeeEditComponent,
                        resolve: { employeeData: EmployeeResolverService}}
            ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EmployeesRoutingModule {

}
