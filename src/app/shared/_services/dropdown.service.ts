import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { UtilitiesService } from './utilities.service';
import { DeviceType } from '../_models/deviceType';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  http = inject(HttpClient);
  
  apiUrl: string = 'http://localhost:3000';
  
  constructor(private _utilities: UtilitiesService,) { }

  getDevicesTypes(): Observable<DeviceType[]> {
      return this.http.get<DeviceType[]>(`${this.apiUrl}/types`)
        .pipe(
          catchError(this._utilities.errorHandler)
        );
  }

  getDevicesPictures(): Observable<DeviceType[]> {
    return this.http.get<DeviceType[]>(`${this.apiUrl}/pictures`)
      .pipe(
        catchError(this._utilities.errorHandler)
      );
}
}
