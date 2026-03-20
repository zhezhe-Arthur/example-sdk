

// import { NativeModules } from "react-native";


const NativeModules = {
  DeviceModule: {
    scan: () => Promise.resolve({ devices: [] }),
    getBatteryLevel: () => Promise.resolve(80),
    getUUID: () => Promise.resolve('mock-uuid12345678')
  }
};
const { DeviceModule  } = NativeModules

export const NativeBridge = {
    // 伪代码
    scan() {
        console.log("bridge 调用原生的scan");
        return Promise.resolve({devices: []})
    },

    // 伪代码
    getSystemInfo() {
        console.log("bridge 调用原生的getSystemInfo");
        return Promise.resolve({
            platform: "mock",
            verson: "1.0",
        })
    },

    // 获取手机电量
    getBatteryLevel(): Promise<number> {
       return DeviceModule.getBatteryLevel();
    },

    // 获取手机uuid
    getUUID(): Promise<string> {
        return DeviceModule.getUUID();
    }

}