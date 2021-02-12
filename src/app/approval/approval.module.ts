import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalComponent } from './approval.component';
import { AppRoutingModule } from '../app-routing.module';
import { ApprovalRoutingModule } from './approval-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { EmployeeChangesComponent } from './employee-changes/employee-changes.component';
import { SharedModule } from '../shared/shared.module';
import { TeamChangesComponent } from './team-changes/team-changes.component';



@NgModule({
  declarations: [ApprovalComponent, EmployeeChangesComponent, TeamChangesComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    AngularMaterialModule,
    SharedModule

  ]
})
export class ApprovalModule { }
