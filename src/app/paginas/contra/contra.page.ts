import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-contra',
  templateUrl: './contra.page.html',
  styleUrls: ['./contra.page.scss'],
})
export class ContraPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid ) {

        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.sentRecoveryEmail(this.form.value.email).then(res => {


          this.utilsSvc.presentToast({
            message: `Se enviara un correo con los procesos para cambiar la contrasena a su correo`,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'mail-outline'
          })

          this.utilsSvc.routerLink('login');
          this.form.reset();

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
