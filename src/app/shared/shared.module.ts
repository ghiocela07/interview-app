import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleDisplayPipe } from './pipes/role-display.pipe';
import { EmployeeItemComponent } from './employee-item/employee-item.component';
import { AngularMaterialModule } from '../angular-material.module';



@NgModule({
  declarations: [
    RoleDisplayPipe,
    EmployeeItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  exports: [
    RoleDisplayPipe,
    EmployeeItemComponent
  ]
})
export class SharedModule { }
