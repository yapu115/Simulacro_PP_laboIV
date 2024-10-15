import { Component, EventEmitter, Output } from '@angular/core';
import { ApiRequestService } from '../../../services/api-request.service';
import { Subscription } from 'rxjs';
import { Pais } from '../../../classes/pais';

@Component({
  selector: 'app-tabla-paises',
  standalone: true,
  imports: [],
  templateUrl: './tabla-paises.component.html',
  styleUrl: './tabla-paises.component.css',
})
export class TablaPaisesComponent {
  paises: any[] = [];
  subscription: Subscription | null = null;

  constructor(protected apiRequest: ApiRequestService) {
    this.CargarPaises();
  }

  CargarPaises() {
    const observable = this.apiRequest.obtenerTodosLosPaises();

    this.subscription = observable.subscribe((data) => {
      this.paises = data;
    });
  }

  @Output() eventoUsuario: EventEmitter<Pais> = new EventEmitter<Pais>();

  GuardarDatos(pais: any) {
    this.eventoUsuario.emit(new Pais(pais.name.common, pais.flags.svg));
  }
}
