import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFrequencyStaffComponent } from './time-frequency-staff.component';

describe('TimeFrequencyStaffComponent', () => {
  let component: TimeFrequencyStaffComponent;
  let fixture: ComponentFixture<TimeFrequencyStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeFrequencyStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeFrequencyStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
