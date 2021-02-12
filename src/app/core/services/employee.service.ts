import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { Employee } from '../models/employee.model';
import { catchError, tap } from 'rxjs/operators';
import { NotificationService } from './notification.service';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class EmployeeService {

    public employeesChanged = new Subject<Employee[]>();
    private readonly employeesApiURL = environment.apiUrl + 'employees';
    private employees: Employee[] = [];

    constructor(private httpClient: HttpClient, private notificationService: NotificationService) { }

    public async getEmployee(id: number): Promise<Employee | undefined> {
        const employee = this.employees.find(
            (e: Employee) => e.id === id
        );
        try {
            if (!employee && id !== 0) {
                return await this.getEmployeeFromApi(id);
            }
        }
        catch (error) {
            this.notificationService.errorNotification('An error occured!' + error.message);
        }

        return employee;
    }

    public async getEmployees(): Promise<Employee[]> {
        const employees = this.employees.slice();
        try {
            if (employees.length === 0) {
                return await this.getEmployeesFromApi();
            }
        }
        catch (error) {
            this.notificationService.errorNotification('An error occured!' + error.message);
        }

        return employees;
    }

    public getNewEmployee(): Employee {
        return new Employee(0, '', '', '', '', '', []);
    }

    public async addEmployee(employee: Employee): Promise<void> {
        const response = await this.addEmployeeToApi(employee);
        this.employees.push(response);
        this.employeesChanged.next(await this.getEmployees());
        this.notificationService.successNotification('Employee added successfully!');
    }

    public async updateEmployee(employeeToBeUpdated: Employee): Promise<void> {
        const response = await this.updateEmployeeToApi(employeeToBeUpdated);
        const updatedIndex = this.employees.findIndex((employee) => employee.id === employeeToBeUpdated.id);
        this.employees[updatedIndex] = response;
        this.notificationService.successNotification('Employee modified successfully!');
        this.employeesChanged.next(await this.getEmployees());
    }


    public async deleteEmployee(employeeId: number): Promise<void> {
        await this.deleteEmployeesToApi(employeeId);
        const deletedIndex = this.employees.findIndex((employee) => employee.id === employeeId);
        this.employees.splice(deletedIndex, 1);
        this.notificationService.successNotification('Employee deleted successfully!');
        this.employeesChanged.next(await this.getEmployees());

    }

    private async addEmployeeToApi(employee: Employee): Promise<Employee> {
        return this.httpClient.post<Employee>(this.employeesApiURL, employee).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async updateEmployeeToApi(employee: Employee): Promise<Employee> {
        return this.httpClient.patch<Employee>(this.employeesApiURL + '/' + employee.id, employee).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async deleteEmployeesToApi(employeeId: number): Promise<void> {
        return this.httpClient.delete<void>(this.employeesApiURL + '/' + employeeId).pipe(
            catchError(
                (error: any) => {
                    this.notificationService.errorNotification('An error occured!' + error.message);
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async getEmployeesFromApi(): Promise<Employee[]> {
        return this.httpClient.get<Employee[]>(this.employeesApiURL).pipe(
            tap(employees => {
                this.setEmployeesData(employees);
            }),
            catchError(
                (error: any) => {
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private async getEmployeeFromApi(id: number): Promise<Employee> {
        return this.httpClient.get<Employee>(this.employeesApiURL + '/' + id).pipe(
            catchError(
                (error: any) => {
                    return throwError(error);
                }
            )
        ).toPromise();
    }

    private setEmployeesData(employeesData: Employee[]): void {
        this.employees = employeesData;
    }

}
