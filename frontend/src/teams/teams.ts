import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import { Team } from '../app/models/team.model';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';
import {TeamsService} from '../app/services/teams';

@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Teams {
  teams: Team[] = [];
  constructor(public auth: Auth, private router: Router  , private TeamService: TeamsService , private cdr: ChangeDetectorRef) { }

ngOnInit() {
    this.TeamService.getTeams().subscribe({
      next: (teams) => {this.teams = teams
      console.log(teams || null)
        this.cdr.markForCheck();}

      ,
      error: (err) => console.log(err),
    })
}

}
