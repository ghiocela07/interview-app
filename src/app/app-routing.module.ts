
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesModule } from './employees/employees.module';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];

@NgModule({
  imports: [
    EmployeesModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
