import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class View {
  currentView = signal<'teams' | 'matches'>('teams');

  toggleView_teams(): void {
    this.currentView.set("matches");
  }
  toggleView_match(): void {
    this.currentView.set("teams");
  }

}
