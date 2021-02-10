import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Employee } from 'src/app/core/models/employee.model';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { ApprovalService } from 'src/app/core/services/approval.service';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {

  public employeeForm: FormGroup | undefined;
  public employee: Employee | undefined;

  public id = -1;
  public editMode = false;

  // used for roles chip list
  public visible = true;
  public selectable = true;
  public removable = true;
  public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private employeesService: EmployeeService,
              private approvalService: ApprovalService) { }

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initializeForm();
      }
    );
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
    if (this.editMode) {
      this.approvalService.addToQueue(ApprovalAction.Edit, ApprovalType.Employee, this.employee, this.getEmployeeFromForm());
    } else {
      this.approvalService.addToQueue(ApprovalAction.Add, ApprovalType.Employee, undefined, this.getEmployeeFromForm());
    }
    this.navigateBack();

  }

  public onCancel(): void {
    this.navigateBack();
  }

  public hasError(controlName: string, errorType: string): boolean | undefined {
    const control = this.employeeForm?.get(controlName);

    return control?.hasError(errorType);
  }

  private initializeForm(): void {
    if (this.editMode) {
      this.employee = this.employeesService.getEmployee(this.id);
    } else {
      this.employee = this.employeesService.getNewEmployee();
    }

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

  private getEmployeeFromForm(): Employee {
    let id;
    if (!this.editMode) {
      id = 0;
    } else {
      id = this.id;
    }

    return new Employee(
      id,
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
}
