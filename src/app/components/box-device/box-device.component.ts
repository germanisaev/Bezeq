import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from '../../shared/_models/device';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-box-device',
  imports: [
    MatButtonModule,
    MatCardModule, 
    MatCheckboxModule, 
    MatButtonToggleModule, 
    MatIconModule
  ],
  templateUrl: './box-device.component.html',
  styleUrl: './box-device.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxDeviceComponent implements OnInit {
  @Input() box!: Device;
  @Input() index!: number;
  @Output() changeType = new EventEmitter<any>();
  toggleClicked: boolean[] = [];
  savedRange = null;

  constructor() {}

  ngOnInit(): void {
    if(this.box.DeviceOK == 1) {
      this.toggleClicked[this.index] = true;
    } else {
      this.toggleClicked[this.index] = false;
    }
  }

  // Toggle Button Background
  toggleColor() {
    
    this.toggleClicked[this.index] = !this.toggleClicked[this.index];
    if(this.toggleClicked[this.index]) {
      this.box.DeviceOK = 1;
    }
    else {
      this.box.DeviceOK = 0;
    }
    this.changeType.emit(this.box);
  }
  
}
