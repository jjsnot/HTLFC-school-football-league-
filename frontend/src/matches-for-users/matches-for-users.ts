import {Component, computed, DestroyRef, inject, signal} from '@angular/core';
import {MatchService} from '../app/services/match-service';
import {TeamsService} from '../app/services/teams';
import {interval, single, switchMap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Match} from '../app/models/match.model';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-matches-for-users',
  imports: [
    DatePipe
  ],
  templateUrl: './matches-for-users.html',
  styleUrl: './matches-for-users.css',
})
export class MatchesForUsers {
  MatchService = inject(MatchService)
  TeamsService = inject(TeamsService)
  private destroyRef = inject(DestroyRef);

  live_match = computed(()=> {
    return this.MatchService.match().find(match => match.status === "live") ?? null;
  })
  minutes = this.live_match()?.duration ?? 0;
  endAt = signal(Date.now() + (this.minutes *60 *1000))


  ngOnInit() {
    this.TeamsService.getTeams().subscribe(teams => {console.log(teams);});
    this.MatchService.getMatches().subscribe();
    interval(1000)
      .pipe(
        switchMap(() => this.MatchService.getMatches()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();
    this.MatchService.getMatches().subscribe();

  }

  protected readonly Date = Date;
}
