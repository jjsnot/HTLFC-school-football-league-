import {Component, signal} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {PopupService} from '../app/services/create-new-team-popup';
import {FormsModule} from '@angular/forms';
import {TeamsService} from '../app/services/teams';

@Component({
  selector: 'app-add-new-team-popup',
  imports: [MatDialogModule, FormsModule,],
  templateUrl: './add-new-team-popup.html',
  styleUrl: './add-new-team-popup.css',
})
export class AddNewTeamPopup {
  constructor(private popupService: PopupService , private teamsService: TeamsService) {}
  team_name:string= "";
  team_score:number=0;

  createNewTeam() {
    this.teamsService.createTeam(this.team_name , this.team_score).subscribe({
      next: (result) => {

        this.teamsService.getTeams().subscribe();
        this.closeDialog();},
      error: (error) => {console.log(error);},
    });


  }

  closeDialog() {
    this.popupService.closePopup();
  }
}
