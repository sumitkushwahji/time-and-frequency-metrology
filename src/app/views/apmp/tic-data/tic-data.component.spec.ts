import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicDataComponent } from './tic-data.component';

describe('TicDataComponent', () => {
  let component: TicDataComponent;
  let fixture: ComponentFixture<TicDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
