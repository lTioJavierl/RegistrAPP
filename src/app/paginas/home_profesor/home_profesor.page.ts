import { Component, OnInit } from '@angular/core';
import { QRCodeModule } from 'angularx-qrcode';



@Component({
  selector: 'app-home_profesor',
  templateUrl: './home_profesor.page.html',
  styleUrls: ['./home_profesor.page.scss'],
})
export class HomeProfesorPage implements OnInit {

  qrCodeString: string = '';
  qrCodeString2: string = '';
  mostrarQR1: boolean = false;
  mostrarQR2: boolean = false;

  ngOnInit() {
    this.iniciarTemporizador();
  }

  generarQR() {
    this.qrCodeString = 'Clase: Clase 1 Nombre Profesor: Ricardo Gonzalez Fecha: 12/12/2023';
    this.mostrarQR1 = true;

    this.iniciarTemporizador();
  }

  generarQR2() {
    this.qrCodeString2 = 'Clase: Clase 2 Nombre Profesor: Ricardo Gonzalez Fecha: 12/12/2023';
    this.mostrarQR2 = true;

    this.iniciarTemporizador();
  }

  iniciarTemporizador() {
    setTimeout(() => {
      this.ocultarQR();
    }, 120000);
  }

  ocultarQR() {
    this.mostrarQR1 = false;
    this.mostrarQR2 = false;

    this.qrCodeString = '';
    this.qrCodeString2 = '';
  }
}
