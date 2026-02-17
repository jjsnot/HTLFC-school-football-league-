import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteContol } from './site-contol';

describe('SiteContol', () => {
  let component: SiteContol;
  let fixture: ComponentFixture<SiteContol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteContol]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteContol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
