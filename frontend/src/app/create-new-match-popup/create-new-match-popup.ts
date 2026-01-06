import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {PopupService} from '../services/popup-service';
import {TeamsService} from '../services/teams';
import {Team} from '../models/team.model';
import { effect } from '@angular/core';
@Component({
  selector: 'app-create-new-match-popup',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-new-match-popup.html',
  styleUrl: './create-new-match-popup.css',
})
export class CreateNewMatchPopup {
  constructor(private popupService: PopupService ,) {
    effect(() => {
      const options = this.SecondTeamOption();
      if (!this.firstTeam) {
        return;
      }

      if(options.length) {
        this.secondTeam.set(options[0]);
      }else {
        this.secondTeam.set(null)
      }
    });
  }
  teamsService = inject(TeamsService);
  teams= this.teamsService.teams
  firstTeam = signal<Team|null>(null);
  secondTeam = signal<Team|null>(null);
  errorMessage = signal("")



  closeDialog() {
    this.popupService.closePopup();
  }
  SecondTeamOption = computed(() =>{
    const all = this.teams();
    const first = this.firstTeam()
    if(!first){
      return all;
    }
    const firstScore = first.score ?? 0;
    return all
      .filter(t => t.id !== first.id)
      .slice()
      .sort((a,b) => {
        const da = Math.abs((a.score ?? 0) - firstScore );
        const db = Math.abs((b.score ?? 0) - firstScore);
        if(da !== db){
          return da - db;
        }
        return (a.name ?? '').localeCompare(b.name ?? '');
      });

  })



  protected readonly NgModel = NgModel;
}
