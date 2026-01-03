import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewTeamPopup } from './add-new-team-popup';

describe('AddNewTeamPopup', () => {
  let component: AddNewTeamPopup;
  let fixture: ComponentFixture<AddNewTeamPopup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewTeamPopup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewTeamPopup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
