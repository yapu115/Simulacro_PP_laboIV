import { Component, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiRequestService } from '../../../services/api-request.service';
import { DatabaseService } from '../../../services/database.service';
import { Actor } from '../../../classes/actor';
import { Pelicula } from '../../../classes/pelicula';

@Component({
  selector: 'app-tabla-actores',
  standalone: true,
  imports: [],
  templateUrl: './tabla-actores.component.html',
  styleUrl: './tabla-actores.component.css',
})
export class TablaActoresComponent {
  actores: Actor[] = [];
  subscription: Subscription | null = null;

  constructor(protected db: DatabaseService) {
    this.cargarActores();
  }

  cargarActores() {
    const observable = this.db.TraerActores();

    this.subscription = observable.subscribe((data) => {
      this.actores = (data as any[]).map(
        (doc) =>
          new Actor(doc.nombre, doc.apellido, doc.documento, doc.edad, doc.pais)
      );
    });
  }

  @Output() eventoUsuario: EventEmitter<Actor> = new EventEmitter<Actor>();

  GuardarDatos(actor: Actor) {
    this.eventoUsuario.emit(actor);
  }
}
