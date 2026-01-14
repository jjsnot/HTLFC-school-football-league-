import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSite } from './main-site';

describe('MainSite', () => {
  let component: MainSite;
  let fixture: ComponentFixture<MainSite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSite]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
