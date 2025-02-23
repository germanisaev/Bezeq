import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDeviceComponent } from './box-device.component';

describe('BoxDeviceComponent', () => {
  let component: BoxDeviceComponent;
  let fixture: ComponentFixture<BoxDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoxDeviceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoxDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
