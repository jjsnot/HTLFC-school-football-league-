import {Injectable, signal} from '@angular/core';
type ViewMode = 'teams' | 'matches' |"site";
type ViewMode_Users = 'home'| 'wetten' | 'baum' | 'top'
@Injectable({
  providedIn: 'root',
})

export class View {
private key_2 = "IsLive"
  private key = "view";
  currentView = signal<ViewMode>(localStorage.getItem(this.key) as ViewMode ?? "teams");
  currentView_Users = signal<ViewMode_Users>(localStorage.getItem(this.key) as ViewMode_Users ?? 'home')






  toggleView_teams(): void {
    this.currentView.set("matches");
    localStorage.setItem(this.key , "matches")
  }
  toggleView_match(): void {
    this.currentView.set("teams");
    localStorage.setItem(this.key , "teams")
  }
  toggleSite(): void {
    this.currentView.set("site");
    localStorage.setItem(this.key , "site")
  }
  toggleView_user(direction:string): void {
    this.currentView_Users.set(`${direction as ViewMode_Users}`);
    localStorage.setItem(this.key , `${direction as ViewMode_Users}`)
  }



}
