import { Routes } from '@angular/router';
import { ListDevicesComponent } from './components/list-devices/list-devices.component';
import { CreateDeviceComponent } from './components/create-device/create-device.component';

export const routes: Routes = [
    { path: '', redirectTo: '/list', pathMatch: 'full'},
    { path: 'list', component: ListDevicesComponent },
    { path: 'create', component: CreateDeviceComponent }
];
