import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialEmergenciaComponent } from './historial-emergencia.component';

describe('HistorialEmergenciaComponent', () => {
  let component: HistorialEmergenciaComponent;
  let fixture: ComponentFixture<HistorialEmergenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialEmergenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
