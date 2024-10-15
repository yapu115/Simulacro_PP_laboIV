import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actor } from '../classes/actor';
import Swal from 'sweetalert2';
import { Pelicula } from '../classes/pelicula';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private firestore: AngularFirestore) {}

  AgregarActor(actor: Actor) {
    const colActores = this.firestore.collection('actores');

    const documento = colActores.doc();
    actor.idFirebase = documento.ref.id;

    documento
      .set({ ...actor })
      .then((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Actor Agregado',
          showConfirmButton: false,
          timer: 1500,
          background: '#6c757d',
          color: '#e5dada',
          backdrop: false,
        });
      })
      .catch((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un error con el actor, intente de nuevo',
          showConfirmButton: false,
          timer: 1500,
          background: '#6c757d',
          color: '#e5dada',
          backdrop: false,
        });
      });
    // colUsuarios.add({ ...usuario });
  }

  AgregarPelicula(p: Pelicula) {
    const colPeliculas = this.firestore.collection('peliculas');

    const documento = colPeliculas.doc();
    p.id = documento.ref.id;

    documento
      .set({ ...p })
      .then((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pelicula Agregada',
          showConfirmButton: false,
          timer: 1500,
          background: '#6c757d',
          color: '#e5dada',
          backdrop: false,
        });
      })
      .catch((resp) => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Hubo un error con la Película, intente de nuevo',
          showConfirmButton: false,
          timer: 1500,
          background: '#6c757d',
          color: '#e5dada',
          backdrop: false,
        });
      });
    // colUsuarios.add({ ...usuario });
  }

  TraerActores() {
    const colChat = this.firestore.collection('actores');

    const observable = colChat.valueChanges();
    return observable;
  }

  // chat
  TraerChat() {
    const colChat = this.firestore.collection('chat');

    const observable = colChat.valueChanges();
    return observable;
  }

  // AgregarMensaje(mensaje: Mensaje) {
  //   const colChat = this.firestore.collection('chat');
  //   colChat.add({ ...mensaje });
  // }
}
