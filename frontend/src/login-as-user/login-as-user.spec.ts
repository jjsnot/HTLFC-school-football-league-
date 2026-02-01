import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAsUser } from './login-as-user';

describe('LoginAsUser', () => {
  let component: LoginAsUser;
  let fixture: ComponentFixture<LoginAsUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAsUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAsUser);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
