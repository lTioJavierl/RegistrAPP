import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.models';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { getFirestore, setDoc, doc, getDoc, addDoc, collection, collectionData, query} from '@angular/fire/firestore'
import { getStorage, uploadString, ref, getDownloadURL } from "firebase/storage"

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  //############################# Autenticacion #################################
  getAuth(){
    return getAuth();
  }

  //============================= Inicio sesion =============================
  signIn(user: User){
    return signInWithEmailAndPassword(getAuth(), user.email,user.password)
  }

  //============================= Crear usuario =============================
  signUp(user: User){
    return createUserWithEmailAndPassword(getAuth(), user.email,user.password)
  }

  //============================= Modificar usuario =============================

  updateUser(displayName: string){
    return updateProfile(getAuth().currentUser, { displayName })
  }

    //============================= Enviar email contrasena nueva =============================

    sentRecoveryEmail(email: string){
      return sendPasswordResetEmail(getAuth(), email);
    }

  //############################# Base de datos #################################

  //============================= Obtener documento de una coleccion =============================
  getCollectionData(path: string, collectionQuery?: any) {
    const ref = collection (getFirestore(), path);
    return collectionData(query(ref, collectionQuery))
  }

  //============================= Setear un documento =============================
  setDocument(path: string, data: any){
    return setDoc(doc(getFirestore(), path), data);
  }
  
  //============================= Obtener un documento =============================
  async getDocument(path: string,){
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  //============================= Agregar documento =============================
  addDocument(path: string, data: any){
    return addDoc(collection (getFirestore(), path), data);
  }

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }
}
