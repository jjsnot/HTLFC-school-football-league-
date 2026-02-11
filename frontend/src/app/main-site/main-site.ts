import {Component, inject} from '@angular/core';

import {routes} from '../app.routes';
import {Router} from '@angular/router';
import {Header} from '../header/header';
import {View} from '../services/view';
import {MatchesForUsers} from '../../matches-for-users/matches-for-users';
import {SocketService} from '../services/socket-service';
import {Matches} from '../../matches/matches';
import {VorBets} from '../vor-bets/vor-bets';

@Component({
  selector: 'app-main-site',
  templateUrl: './main-site.html',
  styleUrl: './main-site.css',
  imports: [
    Header,
    MatchesForUsers,
    Matches,
    VorBets
  ]
})
export class MainSite {
  view = inject(View)
  socket = inject(SocketService)
  constructor(private router: Router , private socketService: SocketService) {
    if(localStorage.getItem('token') === null) {
      router.navigateByUrl('login');
    }
  }
  ngOnInit() {
    this.socket.initAuthOnce()

  }


}
