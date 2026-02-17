import {inject, Injectable, signal} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Team} from '../models/team.model';
import {Teams} from '../../teams/teams';
import {environment} from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  teams = signal<Team[]>([]);
  constructor(private http: HttpClient) {}
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${environment.apiUrl}/api/teams/`).pipe(tap(teams => {this.teams.set(teams)}));
  }
  createTeam(name:string , score:number){
    return this.http.post<Team>(`${environment.apiUrl}/api/teams/` ,{name : name, score : score}).pipe(tap(r => console.log(r)));
  }

  deleteTeam(teamId: number) {
    return this.http.delete<Team>(`${environment.apiUrl}/api/teams/delete-by-id/${teamId}` , {} ).pipe(tap(r => this.teams.update(teams => teams.filter(team => team.id !== teamId))));
  }

  editTeam(team: Team | null){
    return this.http.put<Team>(`${environment.apiUrl}/api/teams/by-name/${team?.name}/score`, {score : team?.score}).pipe(tap(r => console.log(r)));
  }

  getTeamById(id: number) {
    for(let team of this.teams()){
      if(team.id === id){
        return team;
      }
    }
    return null;
  }


}
