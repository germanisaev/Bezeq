import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDevicesComponent } from './list-devices.component';

describe('ListDevicesComponent', () => {
  let component: ListDevicesComponent;
  let fixture: ComponentFixture<ListDevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDevicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
