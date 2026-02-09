import {Component, HostListener, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {View} from '../services/view';
import {LoginAsUserService} from '../services/login-as-user';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  email = signal<string | undefined>("")
  balance  = signal<number | undefined>(0);

  projectName = 'Scoro';
  menuOpen = false;
  view = inject(View)
  loginAsUser = inject(LoginAsUserService)
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.loginAsUser.getUser().subscribe(user => {
      this.email.set(user.email);
      this.balance.set(user.avalible_balance);
    })
  }


  toggleMenu(ev: MouseEvent) {
    ev.stopPropagation();          // wichtig: verhindert sofortiges Schließen
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }
  @HostListener('document:click')
  onDocumentClick() {
    this.closeMenu();              // klick irgendwo -> menu zu
  }

}
