import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsComponent } from './teams.component';
import { TeamsRoutingModule } from './teams-routing.module';
import { AngularMaterialModule } from '../angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { TeamDetailsComponent } from './team-details/team-details.component';



@NgModule({
  declarations: [
      TeamsComponent,
      TeamDetailsComponent,
  ],
  imports: [
      TeamsRoutingModule,
      AngularMaterialModule,
      CommonModule,
      SharedModule,
  ],
  exports: [
    TeamsComponent
  ]
})
export class TeamsModule { }
