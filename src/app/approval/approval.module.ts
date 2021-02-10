import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovalComponent } from './approval.component';
import { AppRoutingModule } from '../app-routing.module';
import { ApprovalRoutingModule } from './approval-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { EmployeeChangesComponent } from './employee-changes/employee-changes.component';
import { ApprovalItemDisplayComponent } from './approval-item-display/approval-item-display.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ApprovalComponent, EmployeeChangesComponent, ApprovalItemDisplayComponent],
  imports: [
    CommonModule,
    ApprovalRoutingModule,
    AngularMaterialModule,
    SharedModule

  ]
})
export class ApprovalModule { }
