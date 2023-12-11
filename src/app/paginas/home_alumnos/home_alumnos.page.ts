import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FormularioModalComponent } from 'src/app/shared/components/formulario-modal/formulario-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home_alumnos.page.html',
  styleUrls: ['./home_alumnos.page.scss'],
})
export class HomePage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
  }

  user(): User{
    return this.utilsSvc.getFromLocalStorage('user');
  }
  ionViewWillEnter() {
    this.getAsistencia();
  }

  // =================== Obtener asistencias de un usuario ==================
  getAsistencia() {
    let path = `users/${this.user().uid}/clase1`;

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        sub.unsubscribe();
      }
    })
  }

  // =================== Agregar asistencia ================== 
  addAsistencia() {

    this.utilsSvc.presentModal({
      component: FormularioModalComponent
    })
  }
}
