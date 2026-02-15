import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiderBoard } from './lider-board';

describe('LiderBoard', () => {
  let component: LiderBoard;
  let fixture: ComponentFixture<LiderBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiderBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiderBoard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
