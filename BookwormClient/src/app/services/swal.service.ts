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

  callSwal(title: string, cancelButtonName: string, confirmButtonName: string, callBack: ()=> void){
    Swal.fire({
      title: title,
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: cancelButtonName,
      showConfirmButton: true,
      confirmButtonText: confirmButtonName
    }).then(res => {
      if(res.isConfirmed){
        callBack();
      }
    })
  }
}

export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'
