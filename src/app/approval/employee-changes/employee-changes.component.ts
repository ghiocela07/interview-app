import { Component, Input, OnInit } from '@angular/core';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';
import { Approval } from 'src/app/core/models/approval.model';
import { Employee } from 'src/app/core/models/employee.model';


@Component({
  selector: 'app-employee-changes',
  templateUrl: './employee-changes.component.html',
  styleUrls: ['./employee-changes.component.scss']
})
export class EmployeeChangesComponent implements OnInit {

  @Input() public approvalItem: Approval | undefined;

  public originalEmployee: Employee | undefined;
  public changedEmployee: Employee | undefined;
  constructor() { }

  public get isAdd(): boolean {
    return this.approvalItem?.action === ApprovalAction.Add;
  }
  public get isEdit(): boolean {
    return this.approvalItem?.action === ApprovalAction.Edit;
  }
  public get isDelete(): boolean {
    return this.approvalItem?.action === ApprovalAction.Delete;
  }

  public ngOnInit(): void {
    switch (this.approvalItem?.type) {
      case ApprovalType.Employee:
        this.originalEmployee = this.approvalItem.original as Employee;
        this.changedEmployee = this.approvalItem.changed as Employee;
    }
    if (this.approvalItem?.action === ApprovalAction.Delete) {
      this.changedEmployee = undefined;
    }
  }

  public isFieldChanged(original: string | undefined, changed: string | undefined): boolean {
    return original !== changed;
  }

  public areRolesChanged(originalRoles: string[] | undefined, changedRoles: string[] | undefined): boolean {
    const oNormalRoles: string[] = [];
    const cNormalRoles: string[] = [];

    originalRoles?.forEach(element => {
      oNormalRoles.push(this.toNormal(element));
    });
    changedRoles?.forEach(element => {
      cNormalRoles.push(this.toNormal(element));
    });

    return JSON.stringify(oNormalRoles) !== JSON.stringify(cNormalRoles);
  }

  private toNormal(value: string): string {

    value = value.split(/(?=[A-Z])/).join(' ');
    value = value[0].toUpperCase() + value.slice(1);

    return value;
  }



}
