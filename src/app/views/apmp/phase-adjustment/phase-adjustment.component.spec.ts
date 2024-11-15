import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseAdjustmentComponent } from './phase-adjustment.component';

describe('PhaseAdjustmentComponent', () => {
  let component: PhaseAdjustmentComponent;
  let fixture: ComponentFixture<PhaseAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhaseAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhaseAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
