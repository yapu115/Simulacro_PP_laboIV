import { Component } from '@angular/core';
import { Actor } from '../../classes/actor';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { authService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { Pelicula } from '../../classes/pelicula';
import { TablaActoresComponent } from './tabla-actores/tabla-actores.component';

@Component({
  selector: 'app-alta-pelicula',
  standalone: true,
  imports: [TablaActoresComponent, ReactiveFormsModule],
  templateUrl: './alta-pelicula.component.html',
  styleUrl: './alta-pelicula.component.css',
})
export class AltaPeliculaComponent {
  actorElegido: Actor | null = null;
  formAlta: FormGroup;

  nombreError: boolean = false;
  tipoError: boolean = false;
  fechaError: boolean = false;
  catidadPublicoError: boolean = false;
  fotoError: boolean = false;
  protagonistaError: boolean = false;

  mensajeNombre: string = '';
  mensajeTipo: string = '';
  mensajeFecha: string = '';
  mensajeCantidadPublico: string = '';
  mensajeFoto: string = '';
  mensajeProtagonista: string = '';

  constructor(protected auth: authService, protected db: DatabaseService) {
    this.formAlta = new FormGroup({
      nombre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]),
      tipo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),
      ]),
      fechaEstreno: new FormControl('', [
        Validators.required,
        Validators.min(new Date('1900-01-01').getTime()),
        Validators.max(new Date('2030-12-31').getTime()),
      ]),
      cantidadPublico: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(10),
        Validators.pattern('^[0-9]*$'),
      ]),
      foto: new FormControl('', [Validators.required]),
      protagonista: new FormControl('', [Validators.required]),
    });
  }

  subirPelicula() {
    this.nombreError = false;
    this.tipoError = false;
    this.fechaError = false;
    this.catidadPublicoError = false;
    this.fotoError = false;
    this.protagonistaError = false;

    if (this.ValidarCampos()) {
      const nombre = this.formAlta.controls['nombre'].value;
      const tipo = this.formAlta.controls['tipo'].value;
      const fechaEstreno = this.formAlta.controls['fechaEstreno'].value;
      const cantidadPublico = this.formAlta.controls['cantidadPublico'].value;
      const foto = this.formAlta.controls['foto'].value;
      const protagonista = this.formAlta.controls['protagonista'].value;

      this.db.AgregarPelicula(
        new Pelicula(
          '0',
          nombre,
          tipo,
          fechaEstreno,
          cantidadPublico,
          foto,
          protagonista
        )
      );
      this.formAlta.get('nombre')?.setValue('');
      this.formAlta.get('tipo')?.setValue('');
      this.formAlta.get('fechaEstreno')?.setValue('');
      this.formAlta.get('cantidadPublico')?.setValue('');
      this.formAlta.get('foto')?.setValue('');
      this.formAlta.get('protagonista')?.setValue('');
    }
  }

  ValidarCampos() {
    let camposValidados = true;

    const controlNombre = this.formAlta.controls['nombre'];
    const controlTipo = this.formAlta.controls['tipo'];
    const controlFechaEstreno = this.formAlta.controls['fechaEstreno'];
    const controlCantidadPublico = this.formAlta.controls['cantidadPublico'];
    const controlFoto = this.formAlta.controls['foto'];
    const controlProtagonista = this.formAlta.controls['protagonista'];

    if (controlNombre.errors !== null) {
      camposValidados = false;
      this.nombreError = true;
      if (controlNombre.errors!['required']) {
        this.mensajeNombre = 'Ingrese un nombre';
      } else if (
        controlNombre.errors!['minlength'] ||
        controlNombre.errors!['maxlength']
      ) {
        this.mensajeNombre = 'El nombre debe tener entre 2 y 50 caracteres';
      } else if (controlNombre.errors!['pattern']) {
        this.mensajeNombre = 'El nombre no puede tener espacios en blanco';
      }
    }

    if (controlTipo.errors !== null) {
      camposValidados = false;
      this.tipoError = true;
      if (controlTipo.errors!['required']) {
        this.mensajeTipo = 'Ingrese un tipo / genero de película';
      } else if (
        controlTipo.errors!['minlength'] ||
        controlTipo.errors!['maxlength']
      ) {
        this.mensajeTipo =
          'El tipo / genero debe tener entre 2 y 15 caracteres';
      } else if (controlTipo.errors!['pattern']) {
        this.mensajeTipo = 'El tipo / genero no puede tener espacios en blanco';
      }
    }

    if (controlFoto.errors !== null) {
      camposValidados = false;
      this.fotoError = true;
      if (controlFoto.errors!['required']) {
        this.mensajeFoto = 'Ingrese la url de una foto';
      }
    }
    if (controlProtagonista.errors !== null) {
      camposValidados = false;
      this.protagonistaError = true;
      if (controlProtagonista.errors!['required']) {
        this.mensajeProtagonista = 'Ingrese un Protagonista de la lista';
      }
    }

    if (controlFechaEstreno.errors !== null) {
      camposValidados = false;
      this.fechaError = true;
      if (controlFechaEstreno.errors!['required']) {
        this.mensajeFecha = 'Ingrese la fecha de estreno';
      } else if (
        controlFechaEstreno.errors!['minlength'] ||
        controlFechaEstreno.errors!['maxlength']
      ) {
        this.mensajeFecha =
          'La fecha debe ser entre los 1900 y hasta 2030 inclusive';
      }
    }

    if (controlCantidadPublico.errors !== null) {
      camposValidados = false;
      this.catidadPublicoError = true;
      if (controlCantidadPublico.errors!['required']) {
        this.mensajeCantidadPublico =
          'Ingrese la Cantidad de publico que asistio a la pelicula';
      } else if (
        controlCantidadPublico.errors!['minlength'] ||
        controlCantidadPublico.errors!['maxlength']
      ) {
        this.mensajeCantidadPublico = 'Ingrese una cantidad válida';
      } else if (controlCantidadPublico.errors!['pattern']) {
        this.mensajeCantidadPublico =
          'La cantidad de personas debe ser un número';
      }
    }

    return camposValidados;
  }

  recibirProtagonista(a: Actor) {
    this.actorElegido = a;
    this.formAlta
      .get('protagonista')
      ?.setValue(this.actorElegido.nombre + ' ' + this.actorElegido.apellido);
  }
}
