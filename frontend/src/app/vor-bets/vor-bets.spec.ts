import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VorBets } from './vor-bets';

describe('VorBets', () => {
  let component: VorBets;
  let fixture: ComponentFixture<VorBets>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VorBets]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VorBets);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
