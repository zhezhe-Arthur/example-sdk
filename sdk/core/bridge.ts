

import { NativeEventEmitter, NativeModules } from "react-native";

const { DeviceModule  } = NativeModules
export const deviceEmitter = new NativeEventEmitter(DeviceModule);

export const NativeBridge = {
    // 获取手机电量
    getBatteryLevel(): Promise<number> {
       return DeviceModule.getBatteryLevel();
    },

    // 获取手机uuid
    getUUID(): Promise<string> {
        return DeviceModule.getUUID();
    },

    startScan(): Promise<string> {
        console.log('bridge 调用原生的startScan');
        return DeviceModule.startScan();
    },

    stopScan(): Promise<string> {
        console.log('bridge 调用原生的stopScan');
        return DeviceModule.stopScan();
    },
}