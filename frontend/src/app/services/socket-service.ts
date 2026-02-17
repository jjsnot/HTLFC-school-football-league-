import {inject, Injectable, signal} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Match} from '../models/match.model';
import {MatchService} from './match-service';
import {Bet} from '../models/bet-model';
import {Bettservice} from './bettservice.service';
import {VorBets} from '../vor-bets/vor-bets';
import {LoginAsUserService} from './login-as-user';
import {User} from '../models/user-model';
import {TeamsService} from './teams';
import {Team} from '../models/team.model';
import{environment} from '../../environment';
import {routes} from '../app.routes';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class SocketService {
  public socket: Socket;
  MatchService = inject(MatchService)
  BetsService = inject(Bettservice);
  LoginAsUser = inject(LoginAsUserService);
  TeamsService = inject(TeamsService)
  timer = signal<number>(11110)
  constructor(private router: Router) {
    this.socket = io(environment.apiUrl);
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
    this.socket.on('timerUpdated', (ms:number) => {
      this.timer.set(ms)
    })
    this.socket.on('NewMatch', (data:Match[]) => {
      this.MatchService.match.set(data);
      this.MatchService.applyCorrectOrder()
    })
    this.socket.on('betsUpdate', (data:Bet[]) => {
      this.BetsService.bets.set(data);
      this.LoginAsUser.getUser().subscribe()
      this.BetsService.getByUser().subscribe()
      this.LoginAsUser.getAllUsers().subscribe();
    })
    this.socket.on('BalUpdate', () => {
      this.LoginAsUser.getUser().subscribe()
      this.BetsService.getByUser().subscribe()
      this.LoginAsUser.getAllUsers().subscribe();
    })
    this.socket.on("TeamUpdate" , () => {
      this.TeamsService.getTeams().subscribe()
    })



  }

  initAuthOnce(){
    this.LoginAsUser.getUser().subscribe(
      {
        next: user =>{
          this.socket.emit("auth" , user.id);
        },
        error: err => {
          this.router.navigate(['/login']);
          console.log(err);
        }
      }
    )
  }

}
