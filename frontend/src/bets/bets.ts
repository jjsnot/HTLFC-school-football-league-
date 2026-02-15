import {Component, computed, inject, signal} from '@angular/core';
import {Bettservice} from '../app/services/bettservice.service';
import {Bet , Pick} from '../app/models/bet-model';
import {MatchService} from '../app/services/match-service';
import {TeamsService} from '../app/services/teams';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-bets',
  imports: [
    DecimalPipe
  ],
  templateUrl: './bets.html',
  styleUrl: './bets.css',
})
export class Bets {
  Bettservice = inject(Bettservice);
  mergedBets = computed(() => this.mergeBets(this.Bettservice.users_bets()))
  MatchService = inject(MatchService);
  TeamsService = inject(TeamsService);

ngOnInit() {
  this.Bettservice.getByUser().subscribe()
  this.MatchService.getMatches().subscribe()
  this.TeamsService.getTeams().subscribe()
}

   mergeBets(bets: Bet[]) {
    const grouped = bets.reduce((acc, b) => {
      const key = `${b.matchId}-${b.pick}`;
      acc[key] ??= { matchId: b.matchId, pick: b.pick, amount: 0 };
      acc[key].amount += b.amount;
      return acc;
    }, {} as Record<string, {matchId:number; pick:Pick; amount:number }>);

    return Object.values(grouped);
  }
  private getMatch(matchId: number) {
    return this.MatchService.match().find(m => m.id === matchId) ?? null;
  }
  isFinished(matchId: number): boolean {
    return this.getMatch(matchId)?.status === 'finished';
  }

  scoreLabel(matchId: number): string {
    const m = this.getMatch(matchId);
    if (!m) return '—';
    return `${m.firstTeamScore ?? 0} : ${m.secondTeamScore ?? 0}`;
  }

  matchLabel(matchId: number): string {
    const m = this.getMatch(matchId);
    if (!m) return `Spiel #${matchId}`;
    const t1 = this.TeamsService.getTeamById(m.team1Id)?.name ?? 'Team 1';
    const t2 = this.TeamsService.getTeamById(m.team2Id)?.name ?? 'Team 2';
    return `${t1} vs ${t2}`;
  }
  pickLabel(matchId: number, pick: Pick): string {
    const m = this.getMatch(matchId);
    if (!m) return pick === 'draw' ? 'Unentschieden' : 'Team';

    const t1 = this.TeamsService.getTeamById(m.team1Id)?.name ?? 'Team 1';
    const t2 = this.TeamsService.getTeamById(m.team2Id)?.name ?? 'Team 2';

    if (pick === 'team1') return t1;
    if (pick === 'team2') return t2;
    return 'Unentschieden';
  }
  pnl(matchId: number, pick: Pick, amount: number): number {
    const m = this.getMatch(matchId);
    if (!m || m.status !== 'finished') return 0;

    const s1 = m.firstTeamScore ?? 0;
    const s2 = m.secondTeamScore ?? 0;

    const win =
      (s1 > s2 && pick === 'team1') ||
      (s2 > s1 && pick === 'team2') ||
      (s1 === s2 && pick === 'draw');

    // твоя логика: выигрыш = amount*2, иначе потеря amount
    return win ? amount : -amount;
  }
  pnlLabel(matchId: number, pick: Pick, amount: number): string {
    const value = this.pnl(matchId, pick, amount);  // твоя функция pnl
    const sign = value > 0 ? "+" : "";              // если положительное — "+"
    return `${sign}${value}`;
  }
}
