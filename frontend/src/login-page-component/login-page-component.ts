import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';
import {Auth} from '../app/core/auth/auth';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login-page-component',
  imports: [
    FormsModule
  ],
  templateUrl: './login-page-component.html',
  styleUrl: './login-page-component.css',
})
export class LoginPageComponent {
  login = "";
  password = "";
  error = signal("");

  constructor(private auth: Auth, private router: Router) {
    if(this.auth.getToken() != null) {
      this.router.navigateByUrl("/admin/home")
    }
  }
  submit() {
    this.auth.login(this.login, this.password).subscribe({
      next: () => this.router.navigateByUrl('/admin/home'),
      error: () => this.error.set('Invalid login or password')
    });
}
}
