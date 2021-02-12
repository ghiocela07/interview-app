import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ApprovalAction } from 'src/app/core/models/approval-action.enum';
import { ApprovalType } from 'src/app/core/models/approval-type.enum';
import { Team } from 'src/app/core/models/team.model';
import { ApprovalService } from 'src/app/core/services/approval.service';
import { TeamsService } from 'src/app/core/services/teams.service';
import { ConfirmationDialogComponent } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss']
})
export class TeamDetailsComponent implements OnInit, OnDestroy {

  public team: Team | undefined;
  private dialogSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute,
              private matDialog: MatDialog,
              private approvalService: ApprovalService) { }

  public ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.team = data.team;
    });
  }

  public ngOnDestroy(): void {
    this.dialogSubscription?.unsubscribe();
  }

  public onDelete(): void {
    const dialog = this.openDialog();
    this.dialogSubscription = dialog.subscribe(confirm => {
      if (confirm) {
        this.approvalService.addToQueue(ApprovalAction.Delete, ApprovalType.Team, this.team, this.team);
      }
    });

  }

  private openDialog(): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        confirmationMessage: 'Are you sure you want to delete this team?',
        pleaseNoteMessage: ''
      }
    });

    return dialogRef.afterClosed();
  }
}
