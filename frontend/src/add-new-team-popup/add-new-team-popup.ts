import {Component, signal} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PopupService} from '../app/services/popup-service';
import {FormsModule} from '@angular/forms';
import {TeamsService} from '../app/services/teams';
import {Teams} from '../teams/teams';
import {Team} from '../app/models/team.model';

@Component({
  selector: 'app-add-new-team-popup',
  imports: [MatDialogModule, FormsModule,],
  templateUrl: './add-new-team-popup.html',
  styleUrl: './add-new-team-popup.css',
})
export class AddNewTeamPopup {
  constructor(private popupService: PopupService , private teamsService: TeamsService) {}
  team_name:string="";
  team_score:number=0;
  errorMessage = signal("")

  createNewTeam() {
    if(this.team_name.length == 0){
      this.errorMessage.set("Please enter a valid name");
      return;
    }
    if(this.team_score < 0){
      this.errorMessage.set("Score can't be less than 0");
      return;
    }
    this.teamsService.createTeam(this.team_name , this.team_score).subscribe({
      next: (result) => {

        this.teamsService.getTeams().subscribe();
        this.closeDialog();},
      error: (error) => {this.errorMessage.set("This team already exists");},
    });


  }

  closeDialog() {
    this.popupService.closePopup();
  }
}
