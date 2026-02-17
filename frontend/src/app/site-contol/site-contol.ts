import {Component, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-site-contol',
  imports: [
    FormsModule
  ],
  templateUrl: './site-contol.html',
  styleUrl: './site-contol.css',
})
export class SiteContol {
  endDateTimeStr = signal<number>(Date.now())


}
