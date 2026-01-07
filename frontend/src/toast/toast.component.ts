import {Component, inject} from '@angular/core';
import {NotificationService} from '../app/services/notification';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
})
export class ToastComponent {
  ns = inject(NotificationService);

}
