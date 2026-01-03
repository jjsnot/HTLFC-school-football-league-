import {inject, Injectable, signal} from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Team} from '../models/team.model';
import {Teams} from '../../teams/teams';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private readonly url ='http://localhost:3000/api/teams';
  teams = signal<Team[]>([]);
  constructor(private http: HttpClient) {}
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url).pipe(tap(teams => {this.teams.set(teams)}));
  }
  createTeam(name:string , score:number){
    return this.http.post<Team>(this.url ,{name : name, score : score}).pipe(tap(r => console.log(r)));

  }


}
