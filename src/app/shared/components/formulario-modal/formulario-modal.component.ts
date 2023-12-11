import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-formulario-modal',
  templateUrl: './formulario-modal.component.html',
  styleUrls: ['./formulario-modal.component.scss'],
})
export class FormularioModalComponent  implements OnInit {

form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    estado: new FormControl('', [Validators.required]),
  })

  user = {} as User;

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
    this.user.uid = this.user ? this.user.uid : null;
    console.log('Usuario:', this.user);
  }
  

  async submit(){
    if(this.form.valid){

        let path = `users/${this.user.uid}/clase1`
        console.log('Path:', path);

        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.addDocument(path, this.form.value).then(async res => {

          this.utilsSvc.dismissModal({ success: true });

          this.utilsSvc.presentToast({
            message: 'Clase registrada con exito',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline'
          })

      }).catch(error => {
        console.log(error);

      this.utilsSvc.presentToast({
        message: error.message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline'
      })

      }).finally(() => {
        loading.dismiss();
      })
    } 
  }
}
