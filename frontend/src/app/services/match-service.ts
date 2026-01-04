import {Injectable, signal} from '@angular/core';
import {Team} from '../models/team.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly url ='http://localhost:3000/api/match';
  match = signal<[]>([]);
  constructor(private http: HttpClient) {}

}
