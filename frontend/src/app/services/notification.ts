import {Injectable, signal} from '@angular/core';


export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  text: string;
  type: ToastType;
  ms: number
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  toast = signal<Toast | null>(null);
  private timer: any = null;

  show(text: string, type: ToastType = 'info', ms = 4000) {

    this.toast.set({ text, type, ms });

    if (this.timer) clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      this.toast.set(null);
    }, ms);
  }

  success(text: string, ms?: number) {
    this.show(text, 'success', ms);
  }

  error(text: string, ms?: number) {
    this.show(text, 'error', ms ?? 4000);
  }

  info(text: string, ms?: number) {
    this.show(text, 'info', ms);
  }

  clear() {
    if (this.timer) clearTimeout(this.timer);
    this.toast.set(null);
  }

}
