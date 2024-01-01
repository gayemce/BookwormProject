import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callToast(title: string, icon: SweetAlertIcon){
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false
    })
    Toast.fire(title, '', icon)
  }
}

export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'
