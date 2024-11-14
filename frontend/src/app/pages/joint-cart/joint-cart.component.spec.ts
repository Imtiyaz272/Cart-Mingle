import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JointCartComponent } from './joint-cart.component';

describe('JointCartComponent', () => {
  let component: JointCartComponent;
  let fixture: ComponentFixture<JointCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JointCartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JointCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
