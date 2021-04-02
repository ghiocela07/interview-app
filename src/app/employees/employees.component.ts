
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApprovalAction } from '../core/models/approval-action.enum';
import { ApprovalType } from '../core/models/approval-type.enum';
import { Employee } from '../core/models/employee.model';
import { ApprovalService } from '../core/services/approval.service';
import { EmployeeService } from '../core/services/employee.service';
import { TeamsService } from '../core/services/teams.service';
import { ConfirmationDialogComponent } from '../shared/confirmation-dialog/confirmation-dialog.component';
import { InformationDialogComponent } from '../shared/information-dialog/information-dialog.component';
import { AddEmployeeToTeamComponent } from './add-employee-to-team/add-employee-to-team.component';


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
export class EmployeesComponent implements OnInit, OnDestroy, AfterViewInit {

  public employees: Employee[] = [];
  public columnsToDisplayFull = ['firstName', 'lastName', 'email', 'roles', 'actions'];
  public columnsToDisplayShort = ['name', 'roles', 'actions'];
  public columnsToDisplay = ['name', 'roles',  'actions'];
  public expandedElement: Employee | null | undefined;
  // public isRouterActivate = false;
  // public isRouterActivate = false;
  @ViewChild('myOutlet', { static: true })
  public myRouter: RouterOutlet | null | undefined;

  private employeesChangedSubscription: Subscription | undefined;
  private dialogSubscription: Subscription | undefined;

  constructor(private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private approvalService: ApprovalService,
    private teamsService: TeamsService,
    private matDialog: MatDialog) { }

  public async ngOnInit(): Promise<void> {
    this.route.data.subscribe(data => {
      this.employees = data.employees;
    });
    this.employeesChangedSubscription = this.employeeService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employees = employees;
    });
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (!this.myRouter?.isActivated) {
            this.columnsToDisplay = this.columnsToDisplayFull;
          }
          else {
            this.columnsToDisplay = this.columnsToDisplayShort;
          }
        }
      });
  }

  public ngAfterViewInit(): void {
    if (!this.myRouter?.isActivated) {
      this.columnsToDisplay = this.columnsToDisplayFull;
    }
    else {
      this.columnsToDisplay = this.columnsToDisplayShort;
    }
  }

  public ngOnDestroy(): void {
    this.employeesChangedSubscription?.unsubscribe();
    this.dialogSubscription?.unsubscribe();
  }

  public onEdit(employee: Employee): void {
    this.columnsToDisplay = this.columnsToDisplayShort;
    this.router.navigate([employee.id + '/edit'], { relativeTo: this.route });
  }

  public onAdd(): void {
    this.columnsToDisplay = this.columnsToDisplayShort;
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  public async onDelete(employee: Employee): Promise<void> {
    const isTeamLeader = await this.teamsService.checkIfEmployeeIsTeamLeader(employee.id);
    if (!isTeamLeader) {
      const dialog = this.openConfirmationDialog();
      this.dialogSubscription = dialog.subscribe((confirm) => {
        if (confirm) {
          this.approvalService.addToQueue(ApprovalAction.Delete, ApprovalType.Employee, employee, employee);
        }
      });
    }
    else {
      this.openInformationDialog();
    }
  }

  public onAddToTeam(employee: Employee): void {
    this.openAddToTeamDialog(employee);
  }

  private openConfirmationDialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        confirmationMessage: 'Are you sure you want to delete this employee?',
        pleaseNoteMessage: 'The employee will be removed from each team where he or she is a team member.'
      }
    });

    return dialogRef.afterClosed();
  }

  private openInformationDialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(InformationDialogComponent, {
      width: '350px',
      data: {
        informationMessage: 'The employee cannot be deleted because is a team leader!',
      }
    });

    return dialogRef.afterClosed();
  }

  private openAddToTeamDialog(employeeObj: Employee): Observable<boolean> {
    const dialogRef = this.matDialog.open(AddEmployeeToTeamComponent, {
      width: '350px',
      data: {
        employee: employeeObj,
      }
    });

    return dialogRef.afterClosed();
  }


}
