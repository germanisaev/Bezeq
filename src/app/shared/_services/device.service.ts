import { inject, Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap } from 'rxjs';
import { Device } from '../_models/device';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UtilitiesService } from './utilities.service';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  http = inject(HttpClient);

  apiUrl: string = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private _utilities: UtilitiesService,) { }

  getDeviceBy(id: any): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/devices/${id}`)
      .pipe(
        catchError(this._utilities.errorHandler)
      );
  }

  getDeviceList(): Observable<Device[]> {
    return this.http.get<Device[]>(`${this.apiUrl}/devices`)
      .pipe(
        catchError(this._utilities.errorHandler)
      );
  }

  createDevice(device: any): Observable<Device> {
    return this.http.post<Device>(`${this.apiUrl}/devices/`, JSON.stringify(device), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        catchError(this._utilities.errorHandler)
      );
  }

  deleteDevice(id: any) {
    return this.http.delete(`${this.apiUrl}/devices/${id}`, this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        catchError(this._utilities.errorHandler)
      );
  }

  updateDevice(device: any, id: any) {
    return this.http.put(`${this.apiUrl}/devices/${id}`, JSON.stringify(device), this.httpOptions)
      .pipe(
        tap(() => {
          this.refreshNeeded$.next();
        }),
        catchError(this._utilities.errorHandler)
      );
  }

}
