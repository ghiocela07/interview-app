import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDisplayPipe } from './pipes/role-display.pipe';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { AngularMaterialModule } from '../angular-material.module';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from './information-dialog/information-dialog.component';
import { RolesDisplayPipe } from './pipes/roles-display.pipe';



@NgModule({
  declarations: [
    RoleDisplayPipe,
    RolesDisplayPipe,
    EmployeeItemComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
  ],
  exports: [
    RoleDisplayPipe,
    RolesDisplayPipe,
    EmployeeItemComponent,
    ConfirmationDialogComponent,
    InformationDialogComponent
  ]
})
export class SharedModule { }
