import {inject, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Match} from '../models/match.model';
import {MatchService} from './match-service';
import {Bet} from '../models/bet-model';
import {Bettservice} from './bettservice.service';
import {VorBets} from '../vor-bets/vor-bets';
import {LoginAsUserService} from './login-as-user';
import {User} from '../models/user-model';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  MatchService = inject(MatchService)
  BetsService = inject(Bettservice);
  LoginAsUser = inject(LoginAsUserService);
  constructor() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      console.log(`Socket Connected: ${this.socket.id}`);
    })
    this.socket.on("disconnect", (reason  ) => {
      console.log(`Socket Disconnected: ${reason}`);
    })
    this.socket.on('connect_error', (err) => {
      console.log('connect_error:', err.message);
    });
    this.socket.on('scoreUpdated', (data:Match) => {
      this.MatchService.updateMatch(data);

    })
    this.socket.on('NewMatch', (data:Match[]) => {
      this.MatchService.match.set(data);
      this.MatchService.applyCorrectOrder()
    })
    this.socket.on('betsUpdate', (data:Bet[]) => {
      this.BetsService.bets.set(data);
    })
    this.socket.on('BalUpdate', (user:User) => {
      this.LoginAsUser.user.set(user)

    })


  }



}
