import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseCorrectionComponent } from './phase-correction.component';

describe('PhaseCorrectionComponent', () => {
  let component: PhaseCorrectionComponent;
  let fixture: ComponentFixture<PhaseCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseCorrectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
