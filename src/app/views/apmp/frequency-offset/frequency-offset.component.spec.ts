import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyOffsetComponent } from './frequency-offset.component';

describe('FrequencyOffsetComponent', () => {
  let component: FrequencyOffsetComponent;
  let fixture: ComponentFixture<FrequencyOffsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequencyOffsetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyOffsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
