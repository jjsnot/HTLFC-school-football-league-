import {Component, computed, DestroyRef, effect, inject, signal} from '@angular/core';
import {MatchService} from '../app/services/match-service';
import {TeamsService} from '../app/services/teams';
import {interval, single, Subscription, switchMap} from 'rxjs';
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
  MatchService = inject(MatchService);
  TeamsService = inject(TeamsService);
  private destroyRef = inject(DestroyRef);
  remaining = signal(0)

  constructor() {
    interval(1000).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(()=>{
      const live = this.live_match()
      if(!live){
        this.remaining.set(0)
        return;
      }
      if(live) {
        const end = new Date(live.endTime as any).getTime();
        this.remaining.set(Math.max(0, end - Date.now()));
      }
    })


  }


  live_match = computed(()=> {
    return this.MatchService.match().find(match => match.status === "live") ?? null;

  })



  ngOnInit() {
    this.TeamsService.getTeams().subscribe(teams => {console.log(teams);});
    this.MatchService.getMatches().subscribe();

    interval(3000)
      .pipe(
        switchMap(() => this.MatchService.getMatches()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe();

  }

  protected readonly Date = Date;
  protected readonly NaN = NaN;
  protected readonly isNaN = isNaN;
}
