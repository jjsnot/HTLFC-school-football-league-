import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Router} from '@angular/router';
import {AdminHome} from '../../../admin-home/admin-home';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private key = "token";


  constructor(private http: HttpClient , private router: Router) { }

  login(login:string , password:string) {
    return this.http.post<{token:string}>("http://localhost:3000/api/admin/", {login , password}).pipe(tap(r=> localStorage.setItem(this.key , r.token)));
  }
  logout() {
    localStorage.removeItem(this.key);
    this.router.navigateByUrl('/login');
  }
  isLoggedIn(): boolean {
    return !!this.getToken()
  }
  getToken(): string | null {
    return localStorage.getItem(this.key);

}




}
