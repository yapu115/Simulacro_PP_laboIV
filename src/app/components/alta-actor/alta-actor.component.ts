import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { Actor } from '../../classes/actor';
import Swal from 'sweetalert2';
import { TablaPaisesComponent } from './tabla-paises/tabla-paises.component';
import { Pais } from '../../classes/pais';

@Component({
  selector: 'app-alta-actor',
  standalone: true,
  imports: [ReactiveFormsModule, TablaPaisesComponent],
  templateUrl: './alta-actor.component.html',
  styleUrl: './alta-actor.component.css',
})
export class AltaActorComponent {
  private router = inject(Router);
  paisElegido: Pais | null = null;
  formAlta: FormGroup;

  nombreError: boolean = false;
  apellidoError: boolean = false;
  documentoError: boolean = false;
  edadError: boolean = false;
  paisError: boolean = false;

  mensajeNombre: string = '';
  mensajeApellido: string = '';
  mensajeDocumento: string = '';
  mensajeEdad: string = '';
  mensajePais: string = '';

  constructor(protected db: DatabaseService) {
    this.formAlta = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
      ]),
      documento: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$'),
      ]),
      edad: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern('^[0-9]*$'),
      ]),
      pais: new FormControl('', [Validators.required]),
    });
  }

  subirActor() {
    this.nombreError = false;
    this.apellidoError = false;
    this.documentoError = false;
    this.edadError = false;
    this.paisError = false;

    if (this.ValidarCampos()) {
      const nombre = this.formAlta.controls['nombre'].value;
      const apellido = this.formAlta.controls['apellido'].value;
      const documento = this.formAlta.controls['documento'].value;
      const edad = this.formAlta.controls['edad'].value;
      const pais = this.formAlta.controls['pais'].value;

      this.db.AgregarActor(new Actor(nombre, apellido, documento, edad, pais));
      this.formAlta.get('nombre')?.setValue('');
      this.formAlta.get('apellido')?.setValue('');
      this.formAlta.get('edad')?.setValue('');
      this.formAlta.get('documento')?.setValue('');
      this.formAlta.get('pais')?.setValue('');
    }
  }

  ValidarCampos() {
    let camposValidados = true;

    const controlNombre = this.formAlta.controls['nombre'];
    const controlApellido = this.formAlta.controls['apellido'];
    const controlDocumento = this.formAlta.controls['documento'];
    const controlEdad = this.formAlta.controls['edad'];
    const controlPais = this.formAlta.controls['pais'];

    if (controlNombre.errors !== null) {
      camposValidados = false;
      this.nombreError = true;
      if (controlNombre.errors!['required']) {
        this.mensajeNombre = 'Ingrese un nombre';
      } else if (
        controlNombre.errors!['minlength'] ||
        controlNombre.errors!['maxlength']
      ) {
        this.mensajeNombre = 'El nombre debe tener entre 3 y 15 caracteres';
      } else if (controlNombre.errors!['pattern']) {
        this.mensajeNombre = 'El nombre no puede tener espacios en blanco';
      }
    }

    if (controlApellido.errors !== null) {
      camposValidados = false;
      this.apellidoError = true;
      if (controlApellido.errors!['required']) {
        this.mensajeApellido = 'Ingrese un apellido';
      } else if (
        controlApellido.errors!['minlength'] ||
        controlApellido.errors!['maxlength']
      ) {
        this.mensajeNombre = 'El apellido debe tener entre 3 y 15 caracteres';
      } else if (controlApellido.errors!['pattern']) {
        this.mensajeNombre = 'El apellido no puede tener espacios en blanco';
      }
    }

    if (controlPais.errors !== null) {
      camposValidados = false;
      this.paisError = true;
      if (controlPais.errors!['required']) {
        this.mensajePais = 'Ingrese un Pais de la lista';
      }
    }

    if (controlDocumento.errors !== null) {
      camposValidados = false;
      this.documentoError = true;
      if (controlDocumento.errors!['required']) {
        this.mensajeDocumento = 'Ingrese el Documento';
      } else if (
        controlDocumento.errors!['minlength'] ||
        controlDocumento.errors!['maxlength']
      ) {
        this.mensajeDocumento = 'El documento debe tener entre 6 y 8 numeros';
      } else if (controlDocumento.errors!['pattern']) {
        this.mensajeEdad = 'El documento debe ser un número sin puntos';
      }
    }

    if (controlEdad.errors !== null) {
      camposValidados = false;
      this.edadError = true;
      if (controlEdad.errors!['required']) {
        this.mensajeEdad = 'Ingrese la edad';
      } else if (
        controlEdad.errors!['minlength'] ||
        controlEdad.errors!['maxlength']
      ) {
        this.mensajeEdad = 'Ingrese una edad válida';
      } else if (controlEdad.errors!['pattern']) {
        this.mensajeEdad = 'La edad debe ser un número';
      }
    }

    return camposValidados;
  }

  recibirPais(p: Pais) {
    this.paisElegido = p;
    this.formAlta.get('pais')?.setValue(this.paisElegido.nombre);
  }
}
