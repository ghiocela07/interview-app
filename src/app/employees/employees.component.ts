
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApprovalAction } from '../core/models/approval-action.enum';
import { ApprovalType } from '../core/models/approval-type.enum';
import { Employee } from '../core/models/employee.model';
import { ApprovalService } from '../core/services/approval.service';
import { EmployeeService } from '../core/services/employee.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EmployeesComponent implements OnInit, OnDestroy {

  public employees: Employee[] = [];
  public columnsToDisplay = ['firstName', 'lastName', 'email', 'actions'];
  public expandedElement: Employee | null | undefined;

  private employeesChangedSubscription: Subscription | undefined;

  constructor(private employeeService: EmployeeService,
              private router: Router,
              private route: ActivatedRoute,
              private approvalService: ApprovalService) { }

  public ngOnInit(): void {
    this.employees = this.employeeService.getEmployees();
    this.employeesChangedSubscription = this.employeeService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
  }

  public ngOnDestroy(): void {
    this.employeesChangedSubscription?.unsubscribe();
  }

  public onEdit(employee: Employee): void {
    this.router.navigate([employee.id + '/edit'], { relativeTo: this.route });
  }

  public onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public onDelete(employee: Employee): void {
    // TODO: open confimartion dialog
    this.approvalService.addToQueue(ApprovalAction.Delete, ApprovalType.Employee, employee, employee);
  }


}
