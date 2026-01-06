import {Component, inject, signal} from '@angular/core';
import {Team} from '../app/models/team.model';
import {HttpClient} from '@angular/common/http';
import {MatchService} from '../app/services/match-service';
import {TeamsService} from '../app/services/teams';
import {Match} from '../app/models/match.model';

@Component({
  selector: 'app-matches',
  imports: [],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
})
export class Matches {
  TeamService = inject(TeamsService)
  MatchService = inject(MatchService);
  matches = this.MatchService.match
  isLive = signal(false);
  constructor(private http: HttpClient ) {}

  ngOnInit() {
    this.MatchService.getMatches().subscribe(
      {
        next: value => {
          console.log(value);
        }
      }
    )

  }


  plus(match: Match , num: number) {
    if(num ===1 && confirm(`Are you sure you want to increase score for team ${this.TeamService.getTeamById(match.team1Id)?.name}?`)){
      this.MatchService.setScore(match.id, (match.firstTeamScore ?? 0) + 1 , match.secondTeamScore ?? 0);
    }else if(num === 2 &&  confirm(`Are you sure you want to increase score for team ${this.TeamService.getTeamById(match.team2Id)?.name}?`) ){
      this.MatchService.setScore(match.id, (match.firstTeamScore ?? 0)  , (match.secondTeamScore ?? 0) + 1);
    }
  }
  minus(match: Match , num: number) {
    if(num ===1 && confirm(`Are you sure you want to decrease score for team ${this.TeamService.getTeamById(match.team1Id)?.name}?`)){
      if((match.firstTeamScore ?? 0) - 1 < 0 ){
        alert("Score can not be negative");
        return;
      }
      this.MatchService.setScore(match.id, (match.firstTeamScore ?? 0) - 1 , match.secondTeamScore ?? 0);


    }else if(num === 2 &&  confirm(`Are you sure you want to decrease score for team ${this.TeamService.getTeamById(match.team2Id)?.name}?`) ){
      if((match.secondTeamScore ?? 0) - 1 < 0){
        alert("Score can not be negative");
        return;
      }
      this.MatchService.setScore(match.id, (match.firstTeamScore ?? 0)  , (match.secondTeamScore ?? 0) - 1);


    }


  }

  startMatch(match: Match) {
    this.MatchService.startMatch(match.id)
    this.isLive.set(true);
    this.MatchService.applyCorrectOrder()

  }
  finishMatch(match: Match) {
    this.MatchService.finishMatch(match.id)
    this.isLive.set(false);
    this.MatchService.applyCorrectOrder()
  }
}
