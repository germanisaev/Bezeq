import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeviceService } from '../../shared/_services/device.service';
import moment from 'moment';
import { DeviceType } from '../../shared/_models/deviceType';
import { DropdownService } from '../../shared/_services/dropdown.service';

@Component({
  selector: 'app-create-device',
  imports: [ReactiveFormsModule, 
            MatDialogContent, 
            MatDialogActions,
            MatInputModule,
            MatButtonModule,
            MatSelectModule,
            MatCheckboxModule,
            MatFormFieldModule],
  providers:[DropdownService],
  templateUrl: './create-device.component.html',
  styleUrl: './create-device.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateDeviceComponent implements OnInit {
  deviceForm!: FormGroup;
  title: any;
  length: any;
  formStatus = signal<string>(''); // Signal to track form status
  isSuccess = true;
  srcResult: any;
  selectedValue!: string;

  dTypes: DeviceType[] = [];
  dPictures: DeviceType[] = [];

  constructor(private fb: FormBuilder, 
              private _service: DeviceService,
              private ref: ChangeDetectorRef,
              private _dropdown: DropdownService,
              public dialogRef: MatDialogRef<CreateDeviceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { message: string, length: number }) {

    this.title = data.message;
    this.length = data.length;
    this._dropdown.getDevicesTypes().subscribe(data => {
      this.dTypes = data;
    });
    this._dropdown.getDevicesPictures().subscribe(data => {
      this.dPictures = data;
    });
    // Define form fields with validation rules
  }

  ngOnInit(): void {
    this.deviceForm = this.fb.group({
      DeviceId: [this.length+1],
      InstallDate: [moment().format('YYYY-MM-DD HH:mm:ss')],
      LastReportDate: [moment().format('YYYY-MM-DD HH:mm:ss')],
      DeviceOK: [this.DeviceOK ? 1 : 0],
      DeviceTypeHebrew: ['', Validators.required],
      DeviceType: ['', Validators.required],
      WebSiteDeviceName: [this.selectedValue, Validators.required],
      Picture: ['', Validators.required],
    });
    // Subscribe to form status changes using Signals
    this.deviceForm.statusChanges.subscribe(status => {
      this.formStatus.set(status);
    });
  }

  get DeviceOK() { return this.deviceForm?.get('DeviceOK'); }

  // Submit handler
  onSubmit(): void {
    if (this.deviceForm.valid) {
      console.log('Form Data:', this.deviceForm.value); // Form values on submission
      setTimeout(() => {
        this._service.createDevice(this.deviceForm.value).subscribe(data => {
          console.log(data);
          this.formStatus.set('Form submitted successfully!');
          this.isSuccess = true;
          this.ref.detectChanges();
          this.closeDialog();
        });
      }, 2000);
    } else {
      console.log('Form is invalid.');
      this.validateAllFormFields(this.deviceForm);
      this.formStatus.set('Form contains errors.');
      this.isSuccess = false;
    }
  }

  closeDialog(): void {
    this.dialogRef.close(`${this.deviceForm.value}`);
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else {
        control!.markAsTouched();
      }
    });
  }

}
