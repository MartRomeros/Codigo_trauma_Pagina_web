import { TestBed } from '@angular/core/testing';

import { EmergenciasService } from './emergencias.service';

describe('EmergenciasService', () => {
  let service: EmergenciasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergenciasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
