import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyAdjustmentComponent } from './frequency-adjustment.component';

describe('FrequencyAdjustmentComponent', () => {
  let component: FrequencyAdjustmentComponent;
  let fixture: ComponentFixture<FrequencyAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequencyAdjustmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
