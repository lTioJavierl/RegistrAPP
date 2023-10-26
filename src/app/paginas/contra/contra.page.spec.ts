import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContraPage } from './contra.page';

describe('ContraPage', () => {
  let component: ContraPage;
  let fixture: ComponentFixture<ContraPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ContraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
