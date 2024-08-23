import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClockComponent } from './main-clock.component';

describe('MainClockComponent', () => {
  let component: MainClockComponent;
  let fixture: ComponentFixture<MainClockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainClockComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainClockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
