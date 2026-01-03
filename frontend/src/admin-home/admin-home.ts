import { Component } from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';

import {Auth} from '../app/core/auth/auth';
import {NgClass, NgIf} from '@angular/common';
import {Sidebar} from '../sidebar/sidebar';
import {Teams} from '../teams/teams';
import {AddNewTeamPopup} from '../add-new-team-popup/add-new-team-popup';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, NgClass, Sidebar, Teams, AddNewTeamPopup],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.css'],
})
export class AdminHome {

  constructor(private auth: Auth, private router: Router) { }



}
