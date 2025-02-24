import { Component, computed, Inject, model, OnDestroy, signal } from '@angular/core';
import { BoxDeviceComponent } from '../box-device/box-device.component';
import { DeviceService } from '../../shared/_services/device.service';
import { Device } from '../../shared/_models/device';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CreateDeviceComponent } from '../create-device/create-device.component';
import { FilterPipe } from '../../shared/_pipes/filter.pipe';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { DateRangeFilterPipe } from '../../shared/_pipes/date-range-filter.pipe';
import { MAT_DATE_FORMATS, MatNativeDateModule } from "@angular/material/core";
import moment from "moment";
import { filter, Subscription } from 'rxjs';
import { UtilitiesService } from '../../shared/_services/utilities.service';

// providers: [{ provide: MAT_DATE_LOCALE, useValue: 'es-ES' }]

@Component({
  selector: 'app-list-devices',
  imports: [
    MatCardModule, 
    MatButtonModule, 
    MatDialogModule, 
    MatInputModule, 
    MatFormFieldModule, 
    BoxDeviceComponent,
    MatDatepickerModule,
    MatNativeDateModule,
    FilterPipe,
    FormsModule, 
    ReactiveFormsModule, 
    JsonPipe,
    DatePipe,
    DateRangeFilterPipe
  ],
  providers: [
    provideNativeDateAdapter(), 
    { provide: MAT_DATE_LOCALE, useValue: 'he-IL' },
    DateRangeFilterPipe,
    UtilitiesService
  ],
  templateUrl: './list-devices.component.html',
  styleUrl: './list-devices.component.css',
})
export class ListDevicesComponent implements OnDestroy {

  devices: any[] = [];
  public value = model(0);
  deviceOn: any;
  deviceOff: any;
  dataSource: any;
  filterField: string = 'DeviceTypeHebrew'; // Default filter by "DeviceTypeHebrew"
  searchText!: string;
  range!: FormGroup;
  start: Date | null = null;
  end: Date | null = null;
  subscription = new Subscription();

  constructor(private _service: DeviceService, 
              private _utilities: UtilitiesService,
              private dialog: MatDialog) {

              this.range = new FormGroup({
                startDate: new FormControl<Date | null>(null),
                endDate: new FormControl<Date | null>(null),
              });
                
              this.getAllDevices();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  get startDate() { return this.range.get('startDate'); }
  get endDate() { return this.range.get('endDate'); }
  
  // Get All Devices from json
  getAllDevices() {
    const sub = this._service.getDeviceList().subscribe({
      next: (data: any) => {
        this.devices = data as Device[];
        this.getCalcResult();
      },
      error: (err: any) => {
        console.error('Error fetching repositories', err);
      }
    });
    this.subscription.add(sub);
  }

  getCalcResult() {
    const result: any = this._utilities.calcQuantityDevices(this.devices);
    this.deviceOn = result.deviceOn;
    this.deviceOff = result.deviceOff;
  }

  // Filter by event
  applyFilter(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value.trim().toLowerCase();
  }

  // Range Datepicker Apply
  rangeApply() {
    this.start = this.startDate?.value;
    this.end = this.endDate?.value;
  }

  // Clear Datepicker and return all devices
  clearDateRange(picker: any) {
    this.range.reset();  // Clears the form controls
    this.start = this.startDate?.value;
    this.end = this.endDate?.value;
      
    picker.close();      // Closes the datepicker popup
  }

  // Change Status Device is Ok or Not Ok
  changeDeviceType(event: any) {
   
    let device: Device;
    device = event;
    
    let date: string = moment().format('YYYY-MM-DD HH:mm:ss');
    device.LastReportDate = date;
    
    this._service.updateDevice(device, device.id).subscribe(data => {
      console.log(data);
      this.getCalcResult();
    });
   
  }

  // Open Dialog Popup
  openDialog(title: any) {
    const dialogRef = this.dialog.open(CreateDeviceComponent, {
      width: '400px',
      height: '600px',
      data: { 
        message: title,
        length: this.devices.length 
      }
    });

    dialogRef.afterClosed().pipe(
      filter(form => form)
    ).subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllDevices();
      dialogRef == null;
    });
  }

}
