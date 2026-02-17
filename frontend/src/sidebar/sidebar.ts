import {Component, inject, signal} from '@angular/core';
import {AdminHome} from '../admin-home/admin-home';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';
import {View} from '../app/services/view';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  constructor(public auth: Auth, private router: Router , private AdminHome: AdminHome ) { }
  view = inject(View)






}
