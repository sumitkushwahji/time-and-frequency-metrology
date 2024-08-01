import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteRabbitComponent } from './white-rabbit.component';

describe('WhiteRabbitComponent', () => {
  let component: WhiteRabbitComponent;
  let fixture: ComponentFixture<WhiteRabbitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteRabbitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhiteRabbitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
