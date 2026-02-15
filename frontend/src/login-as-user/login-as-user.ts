import {Component, signal} from '@angular/core';
import {FormsModule, NgModel} from '@angular/forms';
import {Auth} from '../app/core/auth/auth';
import {Router} from '@angular/router';
import {LoginAsUserService} from '../app/services/login-as-user';

@Component({
  selector: 'app-login-as-user',
  imports: [
    FormsModule
  ],
  templateUrl: './login-as-user.html',
  styleUrl: './login-as-user.css',
})
export class LoginAsUser {
  isSent = signal<boolean>(false);
  email = signal<string>('');
  code = signal<string>('');
  error = signal<string>('');
  constructor(private logasuser: LoginAsUserService, private router: Router) {
    logasuser.getUser().subscribe(user => {this.router.navigateByUrl('/home');} , err => {
      console.log(err);
    })
    if(localStorage.getItem('email')!= null) {
      this.email.set(localStorage.getItem('email')?? "")
      this.isSent.set(true);
    }
  }

   tuggleSent(){
     if(this.checkEmail()){
       this.isSent.set(true)
       localStorage.setItem("email", this.email())
       alert("Die E-Mail wurde versendet. Bitte prüfe auch deinen Spam-/Junk-Ordner")
       this.sendEmail()
     }

  }
  checkEmail(){
    if(!this.email().includes('@')){
      this.error.set("Invalid email address!")
      return false;
    }
     if(!this.email().endsWith('@htlstp.at')){
       this.error.set("We only accept HTL email addresses!")
       return false;
     }

     this.error.set("")
     return true;
  }
  sendEmail(){
    this.logasuser.request(this.email()).subscribe({error: error => {
      console.log(error);
    }})
  }
  verifyEmail(){
    this.logasuser.verifyEmail(this.email() , this.code()).subscribe({next: () => this.router.navigateByUrl('home') , error: error => {alert("Code is not correct!")}})
  }
  changeEmail(){
    localStorage.removeItem('email');
    this.isSent.set(false);
    this.error.set("")
  }


}
