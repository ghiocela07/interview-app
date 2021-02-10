import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from './employee.service';
import { NotificationService } from './notification.service';


@Injectable({ providedIn: 'root' })
export class EmployeesResolverService implements Resolve<Employee[]> {
    constructor(private employeeService: EmployeeService, private notificationService: NotificationService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Employee[] | Observable<Employee[]> {
        const employees = this.employeeService.getEmployees();
        if (employees.length === 0) {
            return this.employeeService.getEmployeesFromApi();
        }

        return employees;
    }
}
