import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePeliculasComponent } from './detalle-peliculas.component';

describe('DetallePeliculasComponent', () => {
  let component: DetallePeliculasComponent;
  let fixture: ComponentFixture<DetallePeliculasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePeliculasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallePeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
