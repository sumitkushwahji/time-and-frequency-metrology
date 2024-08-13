import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RubidiumSteeringComponent } from './rubidium-steering.component';

describe('RubidiumSteeringComponent', () => {
  let component: RubidiumSteeringComponent;
  let fixture: ComponentFixture<RubidiumSteeringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RubidiumSteeringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RubidiumSteeringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
