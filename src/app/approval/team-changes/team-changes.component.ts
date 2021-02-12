import { Component, Input, OnInit } from '@angular/core';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';
import { Approval } from 'src/app/core/models/approval.model';
import { Employee } from 'src/app/core/models/employee.model';
import { Team } from 'src/app/core/models/team.model';


@Component({
  selector: 'app-team-changes',
  templateUrl: './team-changes.component.html',
  styleUrls: ['./team-changes.component.scss']
})
export class TeamChangesComponent implements OnInit {

  @Input() public approvalItem: Approval | undefined;

  public originalTeam: Team | undefined;
  public changedTeam: Team | undefined;
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
      case ApprovalType.Team:
        this.originalTeam = this.approvalItem.original as Team;
        this.changedTeam = this.approvalItem.changed as Team;
    }
    if (this.approvalItem?.action === ApprovalAction.Delete) {
      this.changedTeam = undefined;
    }
  }

  public isNameChanged(original: string | undefined, changed: string | undefined): boolean {
    return original !== changed;
  }

  public isTeamLeaderChanged(original: Employee | undefined, changed: Employee | undefined): boolean {
    return JSON.stringify(original) !== JSON.stringify(changed);
  }

  public isMemberDeleted(member: Employee): boolean {
    return !this.changedTeam?.members.find(m => m.id === member.id);
  }

  public isMemberAdded(member: Employee): boolean {
    return !this.originalTeam?.members.find(m => m.id === member.id);
  }

  // public areRolesChanged(originalRoles: string[] | undefined, changedRoles: string[] | undefined): boolean {
  //   const oNormalRoles: string[] = [];
  //   const cNormalRoles: string[] = [];

  //   originalRoles?.forEach(element => {
  //     oNormalRoles.push(this.toNormal(element));
  //   });
  //   changedRoles?.forEach(element => {
  //     cNormalRoles.push(this.toNormal(element));
  //   });

  //   return JSON.stringify(oNormalRoles) !== JSON.stringify(cNormalRoles);
  // }

  // private toNormal(value: string): string {

  //   value = value.split(/(?=[A-Z])/).join(' ');
  //   value = value[0].toUpperCase() + value.slice(1);

  //   return value;
  // }
}
