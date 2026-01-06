import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewMatchPopup } from './create-new-match-popup';

describe('CreateNewMatchPopup', () => {
  let component: CreateNewMatchPopup;
  let fixture: ComponentFixture<CreateNewMatchPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNewMatchPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNewMatchPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
