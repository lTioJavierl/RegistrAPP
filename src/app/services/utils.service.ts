import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loadingCtrl = inject(LoadingController);
  toastCtrl = inject(ToastController);
  router = inject(Router)
  saveInLocalStorage: any;

  // =================== Loading ==================

  loading(){
    return this.loadingCtrl.create({ spinner: 'crescent'})
  }

  // =================== Toast ==================

  async presentToast(opts?: ToastOptions) {
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }

  // =================== Enrutado a cualquier pagina ==================
  routerLink(url: string){
    return this.router.navigateByUrl(url);
  }

  // =================== Guarda un elemento en localstorage ==================
  saveLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value))
  }

  // =================== Obtiene un elemento en localstora ==================
  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key))
  }

}
