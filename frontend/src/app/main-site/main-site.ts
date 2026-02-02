import {Component, inject} from '@angular/core';

import {routes} from '../app.routes';
import {Router} from '@angular/router';
import {Header} from '../header/header';
import {View} from '../services/view';
import {MatchesForUsers} from '../../matches-for-users/matches-for-users';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.html',
  styleUrl: './main-site.css',
  imports: [
    Header,
    MatchesForUsers
  ]
})
export class MainSite {
  view = inject(View)
  constructor(private router: Router) {
    if(localStorage.getItem('token') === null) {
      router.navigateByUrl('login');
    }
  }

}
