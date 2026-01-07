import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import { Team } from '../app/models/team.model';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';
import {TeamsService} from '../app/services/teams';
import {PopupService} from '../app/services/popup-service';
import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatchService} from '../app/services/match-service';
import {NotificationService} from '../app/services/notification';

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
  constructor(public auth: Auth, private popupService: PopupService , private router: Router  , private TeamService: TeamsService ,private ns:NotificationService ){ }



ngOnInit() {
    this.TeamService.getTeams().subscribe({
      next: data => {},
      error: error => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
      },

    })
}
  openPopup() {
    this.popupService.openPopup();
  }

  deleteTeam(team: Team) {
    if (confirm(`Are you sure you want to delete the "${team.name}" team?`)) {
    this.teamsService.deleteTeam(team.id).subscribe({

      next: () => {
        this.ns.success(`Team ${team.name} successfully deleted!`)
        this.teamsService.getTeams().subscribe()

      },
      error: err => {console.log(err)
        const msg = err?.error?.error || err?.error?.message || err?.message || 'Request failed';
        this.ns.error(msg);},
    })
    }



  }


  editTeam(team: Team) {
    this.popupService.openPopup_2(team);

  }
}
