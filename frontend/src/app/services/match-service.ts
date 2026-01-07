import {Injectable, signal} from '@angular/core';
import {Team} from '../models/team.model';
import {HttpClient} from '@angular/common/http';
import {Observable, pipe, tap} from 'rxjs';
import {Match} from '../models/match.model';
import {MatchPatch} from '../models/match-patch-model';

@Injectable({
  providedIn: 'root',
})
export class MatchService {
  private readonly url ='http://localhost:3000/api/match';
  match = signal<Match[]>([]);

  constructor(private http: HttpClient) {}



  getMatches(): Observable<Match[]> {
    return this.http.get<Match[]>(this.url).pipe(tap(match => {
      this.match.set(match)
      this.applyCorrectOrder()
      }));

  }

  applyCorrectOrder(){
    const priority: Record<string, number> = {
      live: 0,
      scheduled: 1,
      finished: 2,
    };

    this.match.update(arr =>
      [...arr].sort((a, b) => (priority[a.status] ?? 99) - (priority[b.status] ?? 99))
    );
  }
  patchMatch(id: number, patch: MatchPatch){
     this.http.patch<Match>(`${this.url}/${id}`, patch).subscribe(updated => {
       this.match.update(arr=>
         arr.map(m => (m.id === updated.id ? updated : m ))
       )
       this.applyCorrectOrder()
     })
  }
  startMatch(id: number){
     return this.patchMatch(id , {status: "live",
      firstTeamScore: 0, secondTeamScore:0})

  }
  setScore(id: number, first_score: number | null , second_score: number | null){
    return this.patchMatch(id , {firstTeamScore: first_score, secondTeamScore:second_score,})
}
finishMatch(id: number){
    return this.patchMatch(id , {status: "finished",})
}

  createMatch(round: number,team1Id: number, team2Id: number, duration: number){
    return this.http.post<Match>(`${this.url}` , {round:round, team1Id:team1Id, team2Id:team2Id, duration:duration})

}



}
