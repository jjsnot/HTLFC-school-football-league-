import {Component, inject, signal} from '@angular/core';
import {RouterOutlet, RouterLink, RouterLinkActive, Router} from '@angular/router';

import {Auth} from '../app/core/auth/auth';

import {Sidebar} from '../sidebar/sidebar';
import {Teams} from '../teams/teams';
import {AddNewTeamPopup} from '../add-new-team-popup/add-new-team-popup';
import {View} from '../app/services/view';


@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [ Sidebar, Teams,],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.css'],
})
export class AdminHome {
  view = inject(View)


  constructor(private auth: Auth, private router: Router ,) {

  }


}
