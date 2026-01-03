import {Component, signal} from '@angular/core';
import {AdminHome} from '../admin-home/admin-home';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {

  constructor(public auth: Auth, private router: Router , private AdminHome: AdminHome) { }
  currentView = signal<'teams' | 'matches'>('teams');

  changeView(){
    if(this.currentView() == 'teams'){
      this.currentView.set('matches')
    }else{
      this.currentView.set('teams')
    }
}



}
