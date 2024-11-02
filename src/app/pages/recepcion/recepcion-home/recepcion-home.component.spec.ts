import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecepcionHomeComponent } from './recepcion-home.component';

describe('RecepcionHomeComponent', () => {
  let component: RecepcionHomeComponent;
  let fixture: ComponentFixture<RecepcionHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecepcionHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecepcionHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
