import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';


@Injectable({ providedIn: 'root' })
export class EmployeesResolverService implements Resolve<Employee[]> {
    constructor(private employeeService: EmployeeService) { }

   public async  resolve(): Promise<Employee[]> {
        return await this.employeeService.getEmployees();
    }
}
