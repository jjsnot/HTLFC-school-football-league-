import {Component, computed, inject, signal} from '@angular/core';
import {FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {PopupService} from '../services/popup-service';
import {TeamsService} from '../services/teams';
import {Team} from '../models/team.model';
import { effect } from '@angular/core';
import {MatchService} from '../services/match-service';
import {NotificationService} from '../services/notification';
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
  constructor(private popupService: PopupService   , private ns :NotificationService) {
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
  MatchService = inject(MatchService);
  teamsService = inject(TeamsService);
  teams= this.teamsService.teams
  firstTeam = signal<Team|null>(null);
  secondTeam = signal<Team|null>(null);
  errorMessage = signal("")
  duration = signal(0)
  round = signal(this.MatchService.getLastRound())



  closeDialog() {
    this.popupService.closePopup();
  }
  SecondTeamOption = computed(() =>{
    const all = this.teams();
    const first = this.firstTeam()
    if(!first){
      return all;
    }
    const usedIds = new Set(this.MatchService.match().filter(f=> f.round === this.round()).flatMap(match => [match.team1Id , match.team2Id]));
    const firstScore = first.score ?? 0;
    return all
      .filter(t => t.id !== first.id)
      .filter(t => !usedIds.has(t.id))
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




  createMatch() {
    const first = this.firstTeam();
    const second = this.secondTeam();
    const round = this.round();
    const duration = this.duration();
    if(!first || !second){
      this.errorMessage.set("One or both teams are not correct")
      return;
    }
    if(round < 1){
      this.errorMessage.set("Round must be greater than 0")
      return;
    }
    if(duration < 0){
      this.errorMessage.set("Duration must be greater or equal than 0")
      return;
    }

    this.MatchService.createMatch(round ,first.id  , second.id , duration).subscribe({
      next: (r) => {
        this.ns.success(`Match between ${this.teamsService.getTeamById(r.team1Id)?.name} and ${this.teamsService.getTeamById(r.team2Id)?.name} was successfully created!`);
      },
      error: err => {
        const msg = err?.error?.error || err?.error?.message || err?.message || 'Request failed';
        this.ns.error(msg);
      }


    })
    this.MatchService.getMatches().subscribe()
    this.popupService.closePopup();
    this.ns.info("Create new match popup")

  }
}
