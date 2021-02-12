import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Employee } from 'src/app/core/models/employee.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ApprovalService } from 'src/app/core/services/approval.service';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';
import { Observable, Subscription } from 'rxjs';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { InformationDialogComponent } from 'src/app/shared/information-dialog/information-dialog.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit, OnDestroy {

  public employeeForm: FormGroup | undefined;
  public employee: Employee | undefined;

  public id = 0;
  public editMode = false;

  // used for roles chip list
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  private originalForm: FormGroup | undefined;
  private confirmationDialogSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private approvalService: ApprovalService,
              private matDialog: MatDialog) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.employee = data.employeeData.employee;
      this.editMode = data.employeeData.editMode;
      this.initializeForm();
      this.initializeOriginalForm();
      this.id = this.employee ? this.employee.id : 0;
    });
  }

  public ngOnDestroy(): void {
    this.confirmationDialogSubscription?.unsubscribe();
  }

  public addRole(event: MatChipInputEvent): void {
    const input = event.input;
    const roleValue = event.value;

    // Add role
    if ((roleValue || '').trim()) {
      const control = new FormControl(roleValue, Validators.required);
      (this.employeeForm?.get('roles') as FormArray).push(control);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

  }

  public remove(role: string): void {
    const rolesControls = this.employeeForm?.get('roles') as FormArray;
    const index = rolesControls.value.indexOf(role);

    if (index >= 0) {
      (this.employeeForm?.get('roles') as FormArray).removeAt(index);
    }
  }

  public onSubmit(): void {
    if (this.hasFormChanges(this.originalForm, this.employeeForm)) {
      const dialog = this.openConfirmationDialog('Are you sure you want to save?');
      this.confirmationDialogSubscription = dialog.subscribe((confirm) => {
        if (confirm) {
          this.saveEmployee();
          this.navigateBack();
        }
      });
    }
    else {
      this.openInformationDialog();
    }
  }

  public onCancel(): void {
    if (this.hasFormChanges(this.originalForm, this.employeeForm)) {
      const dialog = this.openConfirmationDialog('You have unsaved chnages. Are you sure you want to cancel?');
      this.confirmationDialogSubscription = dialog.subscribe((confirm) => {
        if (confirm) {
          this.navigateBack();
        }
      });
    }
    else {
      this.navigateBack();
    }
  }

  public hasError(controlName: string, errorType: string): boolean | undefined {
    const control = this.employeeForm?.get(controlName);

    return control?.hasError(errorType);
  }

  private initializeForm(): void {

    const rolesArray = new FormArray([]);
    this.employee?.roles?.forEach(role => {
      rolesArray.push(
        new FormControl(role, Validators.required)
      );
    });

    this.employeeForm = new FormGroup({
      firstName: new FormControl(this.employee?.firstName, [Validators.required]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required]),
      email: new FormControl(this.employee?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.employee?.phone, [Validators.required]),
      address: new FormControl(this.employee?.address, [Validators.required]),
      roles: rolesArray
    });
  }

  private initializeOriginalForm(): void {

    const rolesArray = new FormArray([]);
    this.employee?.roles?.forEach(role => {
      rolesArray.push(
        new FormControl(role, Validators.required)
      );
    });

    this.originalForm = new FormGroup({
      firstName: new FormControl(this.employee?.firstName, [Validators.required]),
      lastName: new FormControl(this.employee?.lastName, [Validators.required]),
      email: new FormControl(this.employee?.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.employee?.phone, [Validators.required]),
      address: new FormControl(this.employee?.address, [Validators.required]),
      roles: rolesArray
    });
  }

  private saveEmployee(): void {
    if (this.editMode) {
      this.approvalService.addToQueue(ApprovalAction.Edit, ApprovalType.Employee, this.employee, this.getEmployeeFromForm());
    } else {
      this.approvalService.addToQueue(ApprovalAction.Add, ApprovalType.Employee, undefined, this.getEmployeeFromForm());
    }
  }

  private getEmployeeFromForm(): Employee {
    return new Employee(
      this.id,
      this.employeeForm?.value.firstName,
      this.employeeForm?.value.lastName,
      this.employeeForm?.value.email,
      this.employeeForm?.value.phone,
      this.employeeForm?.value.address,
      this.employeeForm?.value.roles,
    );
  }

  private navigateBack(): void {
    this.router.navigateByUrl('/employees');
  }

  private hasFormChanges(originalForm: FormGroup | undefined, currentForm: FormGroup | undefined): boolean {
    const originalFormValue = originalForm?.getRawValue();
    const currentFormValue = currentForm?.getRawValue();

    return JSON.stringify(originalFormValue) !== JSON.stringify(currentFormValue);
  }

  private openConfirmationDialog(message: string): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        confirmationMessage: message,
        pleaseNoteMessage: ''
      }
    });

    return dialogRef.afterClosed();
  }

  private openInformationDialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(InformationDialogComponent, {
      width: '350px',
      data: {
        informationMessage: 'There are no changes to save!'
      }
    });

    return dialogRef.afterClosed();
  }
}
