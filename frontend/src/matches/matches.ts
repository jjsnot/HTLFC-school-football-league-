import {Component, inject, OnInit, signal} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MatchService} from '../app/services/match-service';
import {TeamsService} from '../app/services/teams';
import {Match} from '../app/models/match.model';
import {PopupService} from '../app/services/popup-service';
import {NotificationService} from '../app/services/notification';
import {ToastComponent} from '../toast/toast.component';
import {View} from '../app/services/view';

@Component({
  selector: 'app-matches',
  imports: [
  ],
  templateUrl: './matches.html',
  styleUrl: './matches.css',
})
export class Matches implements OnInit {
  view = inject(View)
  TeamService = inject(TeamsService)
  MatchService = inject(MatchService);
  matches = this.MatchService.match
  constructor(private http: HttpClient ,private PopupService: PopupService , private ns: NotificationService) {}

  ngOnInit() {

    this.TeamService.getTeams().subscribe()
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
    this.MatchService.applyCorrectOrder()

  }
  finishMatch(match: Match) {
    if(confirm(`Are you sure that score ${match.firstTeamScore}|${match.firstTeamScore} is correct?`)){
      this.MatchService.finishMatch(match.id)
      this.MatchService.applyCorrectOrder()
      this.TeamService.editTeam(this.TeamService.getTeamById(match.team1Id))
    }

  }
  openPopup() {
    this.PopupService.openPopup_3();
  }
  isfinishMatch(matches: Match[]) {
    for (let i of matches){
      if(i.status==="live"){
        return true;
      }

    }
    return false;
  }


}
