import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from '../models/team.model';

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  private readonly url ='http://localhost:3000/api/teams';

  constructor(private http: HttpClient) {}
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.url);
  }

}
