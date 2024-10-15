import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  Unsubscribe,
} from '@angular/fire/auth';
import { DatabaseService } from './database.service';
@Injectable({
  providedIn: 'root',
})
export class authService {
  // usuario info
  usuario: any = null;
  usuarioDeDB: any = null;
  authSubscription?: Unsubscribe;

  // Injecciones
  private auth = inject(Auth);

  // Guards

  constructor(private db: DatabaseService) {}

  RegistrarUsuario({ email, contrasena }: any) {
    return createUserWithEmailAndPassword(this.auth, email, contrasena);
  }

  IniciarSesion({ email, contrasena }: any) {
    return signInWithEmailAndPassword(this.auth, email, contrasena);
  }

  CerrarSesion() {
    return signOut(this.auth);
  }
}
