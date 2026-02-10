import {Component, computed, HostListener, inject, signal} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {View} from '../services/view';
import {LoginAsUserService} from '../services/login-as-user';
import {User} from '../user/user';

@Component({
  selector: 'app-header',
  imports: [

  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  email = signal<string | undefined>("")
  balance  = computed(() =>{
    let user = this.loginAsUser.user()
    if(user){
      return this.loginAsUser.user()!.avalible_balance
    }else
      return 0

  })

  projectName = 'Scoro';
  menuOpen = false;
  view = inject(View)
  loginAsUser = inject(LoginAsUserService)
  constructor(private router: Router) {
  }
  ngOnInit() {
    this.loginAsUser.getUser().subscribe()
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
