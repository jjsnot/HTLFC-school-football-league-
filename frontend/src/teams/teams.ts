import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import { Team } from '../app/models/team.model';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';
import {TeamsService} from '../app/services/teams';
import {PopupService} from '../app/services/create-new-team-popup';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-teams',
  imports: [],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Teams {
  private teamsService = inject(TeamsService);
  teams = this.teamsService.teams;
  constructor(public auth: Auth, private popupService: PopupService , private router: Router  , private TeamService: TeamsService , private cdr: ChangeDetectorRef) { }



ngOnInit() {
    this.TeamService.getTeams().subscribe()
}
  openPopup() {
    this.popupService.openPopup();
  }
  deleteTeam(teamId: number) {
    if (confirm('Are you sure you want to delete this team?')) {

    }



  }



}
