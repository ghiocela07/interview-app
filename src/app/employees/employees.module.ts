
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '../angular-material.module';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { SharedModule } from '../shared/shared.module';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeToTeamComponent } from './add-employee-to-team/add-employee-to-team.component';



@NgModule({
    declarations: [
        EmployeesComponent,
        EmployeeDetailsComponent,
        EmployeeEditComponent,
        AddEmployeeToTeamComponent
    ],
    imports: [
        EmployeesRoutingModule,
        AngularMaterialModule,
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    exports: [
        EmployeesComponent,
        AddEmployeeToTeamComponent
    ]
})
export class EmployeesModule {

}
