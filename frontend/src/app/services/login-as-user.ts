import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginAsUserService {
  constructor(private http: HttpClient , private router: Router) {
  }
  request(email: string) {
    return this.http.post("http://localhost:3000/api/admin/request" , {email})
  }
  verifyEmail(email: string , code: string) {
    return this.http.post<{token: string}>("http://localhost:3000/api/admin/verify", {email , code})
      .pipe(tap(res => localStorage.setItem("token" , res.token)));
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }
  getToken(): string | null{
    return localStorage.getItem("token");

}



}
