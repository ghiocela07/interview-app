import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { Team } from '../models/team.model';
import { EmployeeService } from './employee.service';
import { TeamsService } from './teams.service';


@Injectable({ providedIn: 'root' })
export class EmployeeResolverService implements Resolve<{ employee: Employee | undefined, editMode: boolean }> {
    constructor(private employeeService: EmployeeService) { }

    public async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Promise<{ employee: Employee | undefined, editMode: boolean }> {
        if (route.params.id != null) {
            return {
                employee: await this.employeeService.getEmployee(+route.params.id),
                editMode: true
            };
        }
        return Promise.resolve({ employee: this.employeeService.getNewEmployee(), editMode: false });
    }
}
