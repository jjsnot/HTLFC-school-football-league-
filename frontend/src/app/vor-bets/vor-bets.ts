import {Component, computed, inject, signal} from '@angular/core';
import {MatchService} from '../services/match-service';
import {TeamsService} from '../services/teams';
import {Bettservice} from '../services/bettservice.service';
import {SocketService} from '../services/socket-service';
import {DecimalPipe} from '@angular/common';
import {LoginAsUserService} from '../services/login-as-user';
import {PopupService} from '../services/popup-service';
import {Pick} from '../models/bet-model'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-vor-bets',
  imports: [
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './vor-bets.html',
  styleUrl: './vor-bets.css',
})
export class VorBets {
  constructor(private socketService: SocketService) {}
  MatchService = inject(MatchService);
  TeamsService = inject(TeamsService)
  LoginAsUserSer = inject(LoginAsUserService)
  BetsService = inject(Bettservice)
  Popupservice = inject(PopupService)
  selected = signal<{ matchId: number; pick: Pick } | null>(null);
  amount = signal<number>(0);

  setSelected(matchId: number , pick: Pick) {
    this.selected.set({matchId: matchId, pick: pick});
  }

  isActive(matchId: number, pick: Pick) {
    const s = this.selected();
    return !!s && s.matchId === matchId && s.pick === pick;
  }
  createBet(){
    if(this.amount() <= 0 || !Number(this.amount()) ) {
      alert("Betrag ist zu klein!")
      return;
    }
    if(this.LoginAsUserSer.user()!.avalible_balance<this.amount()){
      alert("Sie haben nicht genug Geld!")
      return;
    }
      if(confirm(`Sind Sie sicher?`)){
        console.log(this.amount())
        this.BetsService.createBet(this.selected()?.matchId , this.selected()?.pick , this.amount()).subscribe()
        this.selected.set({matchId: -1, pick: "draw" });
      }



  }



  ngOnInit() {
    this.MatchService.getMatches().subscribe()
    this.TeamsService.getTeams().subscribe()
    this.BetsService.getBets().subscribe()
  }






}
