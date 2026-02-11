import {Component, computed, inject, signal} from '@angular/core';
import {MatchService} from '../services/match-service';
import {TeamsService} from '../services/teams';
import {Bettservice} from '../services/bettservice.service';
import {SocketService} from '../services/socket-service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-vor-bets',
  imports: [
    DecimalPipe
  ],
  templateUrl: './vor-bets.html',
  styleUrl: './vor-bets.css',
})
export class VorBets {
  constructor(private socketService: SocketService) {}
  MatchService = inject(MatchService);
  TeamsService = inject(TeamsService)
  BetsService = inject(Bettservice)

  ngOnInit() {
    this.MatchService.getMatches().subscribe()
    this.TeamsService.getTeams().subscribe()
    this.BetsService.getBets().subscribe()
  }



}
