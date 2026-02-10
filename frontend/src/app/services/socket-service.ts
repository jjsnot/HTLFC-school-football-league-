import {inject, Injectable} from '@angular/core';
import {io, Socket} from 'socket.io-client';
import {Match} from '../models/match.model';
import {MatchService} from './match-service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  MatchService = inject(MatchService)
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


  }



}
