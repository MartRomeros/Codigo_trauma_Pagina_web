import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergenciasUpdateComponent } from './emergencias-update.component';

describe('EmergenciasUpdateComponent', () => {
  let component: EmergenciasUpdateComponent;
  let fixture: ComponentFixture<EmergenciasUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmergenciasUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergenciasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
