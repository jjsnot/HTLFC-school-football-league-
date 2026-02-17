import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPopup } from './edit-popup';

describe('EditPopup', () => {
  let component: EditPopup;
  let fixture: ComponentFixture<EditPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
