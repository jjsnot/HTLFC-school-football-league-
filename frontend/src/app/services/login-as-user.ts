import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Router} from '@angular/router';
import {AllUsers, User} from '../models/user-model';

@Injectable({
  providedIn: 'root',
})
export class LoginAsUserService {
  public user = signal<User | null>(null)
  constructor(private http: HttpClient , private router: Router) {
  }

  request(email: string) {
    return this.http.post("http://localhost:3000/api/admin/request" , {email})
  }
  verifyEmail(email: string , code: string) {
    return this.http.post<{token: string}>("http://localhost:3000/api/admin/verify", {email , code})
      .pipe(tap(res => localStorage.setItem("token" , res.token)));
  }
  getUser(): Observable<User>{
    return this.http.get<User>("http://localhost:3000/api/user/acc").pipe(tap(res => this.user.set(res)));
  }
  getAllUsers(){
    return this.http.get<AllUsers[]>("http://localhost:3000/api/user");
  }
  logout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('login');
  }
  getToken(): string | null{
    return localStorage.getItem("token");

}



}
