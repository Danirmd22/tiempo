import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSensacionComponent } from './card-sensacion.component';

describe('CardSensacionComponent', () => {
  let component: CardSensacionComponent;
  let fixture: ComponentFixture<CardSensacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSensacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardSensacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
