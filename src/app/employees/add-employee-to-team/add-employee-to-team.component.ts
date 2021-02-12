import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';
import { Employee } from 'src/app/core/models/employee.model';
import { Team } from 'src/app/core/models/team.model';
import { ApprovalService } from 'src/app/core/services/approval.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { TeamsService } from 'src/app/core/services/teams.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-employee-to-team',
  templateUrl: './add-employee-to-team.component.html',
  styleUrls: ['./add-employee-to-team.component.scss']
})
export class AddEmployeeToTeamComponent implements OnInit, OnDestroy {

  public teams: Team[] | undefined;
  public selectedTeams: Team[] | undefined;

  private confirmationDialogSubscription: Subscription | undefined;
  constructor(
    public dialogRef: MatDialogRef<AddEmployeeToTeamComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { employee: Employee },
    private teamsService: TeamsService,
    private matDialog: MatDialog,
    private approvalService: ApprovalService) { }

  public async ngOnInit(): Promise<void> {
    this.teams = await this.teamsService.getAvailableTeamsForEmployee(this.data.employee);
  }

  public ngOnDestroy(): void {
    this.confirmationDialogSubscription?.unsubscribe();
  }

  public get isSaveButtonDisabled(): boolean {
    return !this.teams || !this.selectedTeams;
  }

  public onSave(): void {

    const dialog = this.openConfirmationDialog('Are you sure you want to save?');
    this.confirmationDialogSubscription = dialog.subscribe((confirm: boolean) => {
      if (confirm) {
        console.log(this.selectedTeams);
        this.selectedTeams?.forEach(team => {
          const originalTeam = JSON.parse(JSON.stringify(team)) as Team;
          team.members.push(this.data.employee);
          this.approvalService.addToQueue(ApprovalAction.Edit, ApprovalType.Team, originalTeam, team);
        });
        this.dialogRef.close();
      }
    });
  }

  public onCancel(): void {
    if (this.selectedTeams) {
      const dialog = this.openConfirmationDialog('Are you sure you want to cancel?');
      this.confirmationDialogSubscription = dialog.subscribe((confirm: boolean) => {
        if (confirm) {
          this.dialogRef.close();
        }
      });
    }
    else {
      this.dialogRef.close();
    }
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
}
