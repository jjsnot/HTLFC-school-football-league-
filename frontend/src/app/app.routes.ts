import { Routes } from '@angular/router';
import {LoginPageComponent} from '../login-page-component/login-page-component';
import {AdminHome} from '../admin-home/admin-home';
import {MainSite} from './main-site/main-site';



export const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'admin/home', component: AdminHome,},
  {path: 'home' , component: MainSite}
];
