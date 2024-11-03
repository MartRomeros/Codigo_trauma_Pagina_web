import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor() { }

  presentarAlerta(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error!',
      text: mensaje
    })
  }

  presentarAlertaSucess(mensaje: String) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: mensaje,
      showConfirmButton: false,
      timer: 1500
    });
  }


}
