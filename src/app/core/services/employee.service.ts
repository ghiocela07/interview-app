import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { catchError, tap } from 'rxjs/operators';
import { ApprovalAction } from '../models/approval-action.enum';
import { NotificationService } from './notification.service';


@Injectable({ providedIn: 'root' })
export class EmployeeService {

    public employeesChanged = new Subject<Employee[]>();
    private readonly employeesApiURL = 'https://my-json-server.typicode.com/crialecaldarea/interview/employees';
    private employees: Employee[] = [];

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

    getEmployeesFromApi(): Observable<Employee[]> {
        return this.httpClient.get<Employee[]>(this.employeesApiURL).pipe(
            tap(employees => {
                this.setEmployeesData(employees);
            }),
            catchError(
                    (error: any) => {
                        this.notificationService.errorNotification('An error occured!' + error.message);
                        return throwError(error);
                    }
                )
            );
    }

    getEmployee(id: number): Employee | undefined {
        return this.employees.find(
            (e: Employee) => e.id === id
        );
    }

    getNewEmployee(): Employee {
        return new Employee(0, '', '', '', '', '', []);
    }


    setEmployeesData(employeesData: Employee[]): void {
        this.employees = employeesData;
    }

    getEmployees(): Employee[] {
        return this.employees.slice();
    }

    manageEmployee(employee: Employee, action: ApprovalAction): void {
        switch (action) {
            case ApprovalAction.Add:
                this.addEmployeeToApi(employee);
                break;
            case ApprovalAction.Edit:
                this.editEmployeeToApi(employee);
                break;
            case ApprovalAction.Delete:
                this.deleteEmployeesToApi(employee.id);
                break;
        }
    }
    addEmployee(employee: Employee): void {
        this.employees.push(employee);
        this.employeesChanged.next(this.getEmployees());

    }

    updateEmployee(employeeToBeUpdated: Employee): void {
        const updatedIndex = this.employees.findIndex((employee) => employee.id === employeeToBeUpdated.id);
        this.employees[updatedIndex] = employeeToBeUpdated;

        this.employeesChanged.next(this.getEmployees());

    }

    deleteEmployee(employeeId: number): void {
        const deletedIndex = this.employees.findIndex((employee) => employee.id === employeeId);
        this.employees.splice(deletedIndex, 1);
        this.employeesChanged.next(this.getEmployees());
    }

    addEmployeeToApi(employee: Employee): void {
        this.httpClient.post<Employee>(this.employeesApiURL, employee).subscribe(
            response => {
                this.addEmployee(response);
                this.notificationService.successNotification('Employee added successfully!');
            },
            error => {
                this.notificationService.errorNotification('An error occured!' + error.message);
            }
        );
    }

    editEmployeeToApi(employee: Employee): void {
        this.httpClient.patch<Employee>(this.employeesApiURL + '/' + employee.id, employee).subscribe(
            response => {
                this.updateEmployee(response);
                this.notificationService.successNotification('Employee modified successfully!');
            },
            error => {
                this.notificationService.errorNotification('An error occured!' + error.message);
            }
        );
    }
    deleteEmployeesToApi(employeeId: number): void {
        this.httpClient.delete<void>(this.employeesApiURL + '/' + employeeId).subscribe(
            response => {
                this.deleteEmployee(employeeId);
                this.notificationService.successNotification('Employee deleted successfully!');
            },
            error => {
                this.notificationService.errorNotification('An error occured!' + error.message);
            }
        );
    }

}
