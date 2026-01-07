import {Injectable, signal} from '@angular/core';
type ViewMode = 'teams' | 'matches';
@Injectable({
  providedIn: 'root',
})

export class View {
private key_2 = "IsLive"
  private key = "view";
  currentView = signal<ViewMode>(localStorage.getItem(this.key) as ViewMode ?? "teams");






  toggleView_teams(): void {
    this.currentView.set("matches");
    localStorage.setItem(this.key , "matches")
  }
  toggleView_match(): void {
    this.currentView.set("teams");
    localStorage.setItem(this.key , "teams")
  }

}
