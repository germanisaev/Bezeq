export class DeviceQuantity {
    constructor(deviceOn: number, deviceOff: number) {
        this.deviceOn = deviceOn;
        this.deviceOff = deviceOff;
    }
    deviceOn!: number;
    deviceOff!: number;
}