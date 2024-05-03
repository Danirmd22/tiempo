import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPronosticosemanalComponent } from './card-pronosticosemanal.component';

describe('CardPronosticosemanalComponent', () => {
  let component: CardPronosticosemanalComponent;
  let fixture: ComponentFixture<CardPronosticosemanalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPronosticosemanalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardPronosticosemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
