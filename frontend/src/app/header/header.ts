import {Component, HostListener, inject} from '@angular/core';
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
  view = inject(View)
  loginAsUser = inject(LoginAsUserService)
  constructor(private router: Router) {

  }
  projectName = 'Scoro';
  menuOpen = false;

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
