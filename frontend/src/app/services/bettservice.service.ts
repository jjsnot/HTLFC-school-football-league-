import {computed, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Match} from '../models/match.model';
import {Bet} from '../models/bet-model';
import {take, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Bettservice {
  constructor(private http: HttpClient) { }
  private readonly url ='http://localhost:3000/api/bets';
  public bets = signal<Bet[]>([]);
  public id_bets = signal<Bet[]>([]);
  public percentByMatch = computed(() => {
    const res: Record<number, { first:number; second:number; draw:number }> = {};

    for (const b of this.bets()) {
      const id = b.matchId;
      res[id] ??= { first: 0, second: 0, draw: 0 };

      if (b.pick === 'team1') {res[id].first+= b.amount;}
      else if (b.pick === 'team2') {res[id].second+= b.amount;}
      else {res[id].draw+= b.amount}
    }

    for (const idStr of Object.keys(res)) {
      const id = Number(idStr);
      const sum = res[id].first + res[id].second + res[id].draw;
      if (sum === 0) continue;

      res[id] = {
        first: res[id].first / sum * 100,
        second: res[id].second / sum * 100,
        draw: res[id].draw / sum * 100,
      };
    }

    return res;
  });




  createBet(matchId:number , userId:number ,pick:string, amount:number ){
    return this.http.post<Bet>(`${this.url}` , {matchId:matchId, userId:userId, pick:pick, amount:amount})
  }
  getById(id:number){
    return this.http.get<Bet[]>(`${this.url}/by/match/${id}`).pipe(tap(bets => {
      this.id_bets.set(bets);
    }));
  }
  getBets(){
    return this.http.get<Bet[]>(`${this.url}`).pipe(tap(bets => {
      this.bets.set(bets);
    }));
  }

}
