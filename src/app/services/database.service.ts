import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Actor } from '../classes/actor';
import Swal from 'sweetalert2';

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

  TraerUsuario() {
    const colUsuarios = this.firestore.collection('usuarios');

    // ACA ESTÁ LA CLAVE PARA HACER EL CHAT
    const observable = colUsuarios.valueChanges();
    return observable;

    // observable.subscribe((resultado) => {
    //   console.log(resultado);
    // });
  }

  // ModificarUsuario(usuario: Usuario) {
  //   const colUsuarios = this.firestore.collection('usuarios');
  //   const documento = colUsuarios.doc(usuario.id);

  //   documento.update({ ...usuario });
  // }

  // EliminarUsuario(usuario: Usuario) {
  //   const colUsuarios = this.firestore.collection('usuarios');
  //   const documento = colUsuarios.doc(usuario.id);

  //   documento.delete();
  // }

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
