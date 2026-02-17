import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchesForUsers } from './matches-for-users';

describe('MatchesForUsers', () => {
  let component: MatchesForUsers;
  let fixture: ComponentFixture<MatchesForUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchesForUsers]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatchesForUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
