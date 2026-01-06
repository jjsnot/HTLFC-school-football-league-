import {Component, inject, signal} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PopupService} from '../services/popup-service';
import {TeamsService} from '../services/teams';

@Component({
  selector: 'app-edit-popup',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './edit-popup.html',
  styleUrl: './edit-popup.css',
})
export class EditPopup {
  constructor(protected popupService:PopupService, private teamsService: TeamsService) {}
  teamScore= signal(0);
  errorMessage =signal("");


  closeDialog() {
    this.popupService.closePopup();
  }


  editTeam() {
    if(isNaN(Number(this.teamScore())) || Number(this.teamScore()) <0 ) {
      this.errorMessage.set("Invalid score");
      return;
    }
    if (this.popupService.team) {
      this.popupService.team.score = Number(this.teamScore());
    }
    this.teamsService.editTeam(this.popupService.team).subscribe({
      next:(result) => {
        this.teamsService.getTeams().subscribe();
        this.closeDialog();
      },
      error:(error) =>{
        this.errorMessage.set("Something went wrong");
    }
    })





  }

  plus() {
    this.teamScore.set(this.teamScore() + 1)

  }
  minus() {
    if(this.teamScore() - 1 < 0){
      return;
    }
    this.teamScore.set(this.teamScore() - 1)

  }
}
