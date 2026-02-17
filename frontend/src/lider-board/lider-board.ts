import {Component, computed, effect, inject} from '@angular/core';
import {LoginAsUserService} from '../app/services/login-as-user';
import {DecimalPipe} from '@angular/common';

type U = { id:number; email:string; avalible_balance:number; frozen_balance:number };

@Component({
  selector: 'app-lider-board',
  imports: [
    DecimalPipe
  ],
  templateUrl: './lider-board.html',
  styleUrl: './lider-board.css',
})
export class LiderBoard {
  LoginAsUserService = inject(LoginAsUserService);

  meId = computed(() => this.LoginAsUserService.user()?.id ?? null);

  usersSorted = computed(() => {
    const list = this.LoginAsUserService.users() as U[];
    return [...list].sort((a, b) => this.total(b) - this.total(a));
  });

  myRank = computed(() => {
    const id = this.meId();
    if (!id) return null;
    const idx = this.usersSorted().findIndex(u => u.id === id);
    return idx === -1 ? null : idx + 1;
  });

  total(u: U) {
    return (u.avalible_balance ?? 0) + (u.frozen_balance ?? 0);
  }

  constructor() {
    effect(() => {
      const id = this.meId();
      const list = this.usersSorted();
      if (!id || list.length === 0) return;

      queueMicrotask(() => {
        document.getElementById(`user-${id}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    });
  }

  ngOnInit() {
    this.LoginAsUserService.getUser().subscribe();
    this.LoginAsUserService.getAllUsers().subscribe(); // убедись что метод есть
  }

}
