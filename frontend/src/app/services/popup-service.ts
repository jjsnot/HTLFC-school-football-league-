import {Injectable, Output} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTeamPopup } from '../../add-new-team-popup/add-new-team-popup';
import {EditPopup} from '../edit-popup/edit-popup';
import {Team} from '../models/team.model';
import {Match} from '../models/match.model';
import {CreateNewMatchPopup} from '../create-new-match-popup/create-new-match-popup';
import {Pick} from '../models/bet-model';


@Injectable({
  providedIn: 'root',
})
export class PopupService {
  team: Team | undefined;
  pick: Pick | undefined;
  matchId: number | undefined;
  constructor(private dialog: MatDialog) {}


  openPopup() {
    this.dialog.open(AddNewTeamPopup, {
      width: '400px',        // ← Ширина
      height: '350px',       // ← Высота
      maxWidth: '90vw',      // На мобилке не больше 90% ширины экрана
      maxHeight: '90vh',     // На мобилке не больше 90% высоты экрана
      disableClose: false,   // Можно ли закрыть кликом вне диалога
      panelClass: 'custom-dialog' // Кастомный класс для стилей
    });
  }
  openPopup_2(team: Team) {
    this.team = team;
    this.dialog.open(EditPopup, {
      width: '400px',        // ← Ширина
      height: '350px',       // ← Высота
      maxWidth: '90vw',      // На мобилке не больше 90% ширины экрана
      maxHeight: '90vh',     // На мобилке не больше 90% высоты экрана
      disableClose: false,   // Можно ли закрыть кликом вне диалога
      panelClass: 'custom-dialog' // Кастомный класс для стилей
    });

}
  openPopup_3() {
    this.dialog.open(CreateNewMatchPopup, {
      width: '400px',        // ← Ширина
      height: '360px',       // ← Высота
      maxWidth: '90vw',      // На мобилке не больше 90% ширины экрана
      maxHeight: '90vh',     // На мобилке не больше 90% высоты экрана
      disableClose: false,   // Можно ли закрыть кликом вне диалога
      panelClass: 'custom-dialog' // Кастомный класс для стилей
    });

  }

  closePopup() {
    this.dialog.closeAll()
  }
}
