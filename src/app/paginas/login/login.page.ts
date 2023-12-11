import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.models';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

//=================FireBase======================

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuuNHv8w4c5Wk2k1sAHbTWGneDL37Py7Q",
  authDomain: "registrapp-eb04c.firebaseapp.com",
  projectId: "registrapp-eb04c",
  storageBucket: "registrapp-eb04c.appspot.com",
  messagingSenderId: "96592991905",
  appId: "1:96592991905:web:8c92b64dbcd92056d0c2e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//=================FireBase======================

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService)

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
        const loading = await this.utilsSvc.loading();
        await loading.present();

        this.firebaseSvc.signIn(this.form.value as User).then(res => {

          this.setUserInfo(res.user.uid)

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
  
  async setUserInfo(uid: string){
    if(this.form.valid){

      const loading = await this.utilsSvc.loading();
      await loading.present();

      let path = `users/${uid}`;

      this.firebaseSvc.getDocument(path).then((user: User) => {

        this.utilsSvc.saveLocalStorage('user', { ...this.form.value, uid: uid });
        if (user.tipo_pagina == 'Alumno'){
          this.utilsSvc.routerLink('home_alumnos');
          this.form.reset();
        }
        if(user.tipo_pagina == 'Profesor'){
          this.utilsSvc.routerLink('home_profesor');
          this.form.reset();
        }

          this.utilsSvc.presentToast({
            message: `Te damos la bienvenida ${user.name}`,
            duration: 2200,
            color: 'primary',
            position: 'middle',
            icon: 'person-circle-outline'
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
