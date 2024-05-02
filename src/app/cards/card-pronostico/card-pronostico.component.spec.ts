import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPronosticoComponent } from './card-pronostico.component';

describe('CardPronosticoComponent', () => {
  let component: CardPronosticoComponent;
  let fixture: ComponentFixture<CardPronosticoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPronosticoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPronosticoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
