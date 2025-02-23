import { Injectable } from '@angular/core';
import { Device } from '../_models/device';
import { DeviceQuantity } from '../_models/deviceQuantity';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  calcQuantityDevices(devices: Device[]) {
    
    const deviceOn = Object.values(devices).reduce((a, { DeviceOK }) => a + DeviceOK, 0);
    const deviceOff = devices.length - deviceOn;

    const result = new DeviceQuantity(deviceOn, deviceOff);

    return result;
  }

  errorHandler(error: any) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        errorMessage = error.error.message;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
  }
}
