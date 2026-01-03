import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTeamPopup } from '../../add-new-team-popup/add-new-team-popup';

@Injectable({
  providedIn: 'root',
})
export class PopupService {
  constructor(private dialog: MatDialog) {}


  openPopup() {
    this.dialog.open(AddNewTeamPopup, {
      width: '400px',        // ← Ширина
      height: '300px',       // ← Высота
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
