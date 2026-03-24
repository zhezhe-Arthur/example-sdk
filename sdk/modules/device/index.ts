import { NativeBridge, deviceEmitter } from "@/sdk/core/bridge";

type SDKResponse<T> = {
  code: number;
  meseeage: string;
  data: T | null;
};

type DeviceFoundPayload = {
  id: string;
  name: string;
  rssi: number;
};

type ScanStatePayload = {
  scanning: boolean;
};

type ScanErrorPayload = {
  code: string;
  message: string;
};
export type ScanDevice = {
  id: string;
  name: string;
  rssi: number;
};

export const device = {
  // 获取手机电量
  async getBatteryLevel(): Promise<SDKResponse<number>> {
    try {
      const res = await NativeBridge.getBatteryLevel();
      return {
        code: 200,
        meseeage: '成功',
        data: res,
      };
    } catch (error: any) {
      return {
        code: 500,
        meseeage: error?.message || '获取电量失败',
        data: null,
      };
    }
  },

  // 获取UUID
   async getUUID(): Promise<SDKResponse<string>> {
    try {
      const res = await NativeBridge.getUUID();
      return {
        code: 200,
        meseeage: '成功',
        data: res,
      };
    } catch (error: any) {
      return {
        code: 500,
        meseeage: error?.message || '获取UUID失败',
        data: null,
      };
    }
  },

  async startScan(): Promise<SDKResponse<string>> {
    try {
      const res = await NativeBridge.startScan();
      return {
        code: 200,
        meseeage: '成功',
        data: res,
      };
    } catch (error: any) {
      return {
        code: 500,
        meseeage: error?.message || '启动扫描失败',
        data: null,
      };
    }
  },

  async stopScan(): Promise<SDKResponse<string>> {
    try {
      const res = await NativeBridge.stopScan();
      return {
        code: 200,
        meseeage: '成功',
        data: res,
      };
    } catch (error: any) {
      return {
        code: 500,
        meseeage: error?.message || '停止扫描失败',
        data: null,
      };
    }
  },

  // 发现设备事件（最重要）
  onDeviceFound(callback: (device: ScanDevice) => void) {
    return deviceEmitter.addListener(
      'deviceFound',
      (payload: DeviceFoundPayload) => {
        callback({
          id: payload.id,
          name: payload.name,
          rssi: payload.rssi,
        });
      }
    );
  },

  // 扫描状态变化
  onScanStateChange(callback: (scanning: boolean) => void) {
    return deviceEmitter.addListener(
      'scanStateChange',
      (payload: ScanStatePayload) => {
        callback(payload.scanning);
      }
    );
  },

  // 扫描错误
  onScanError(callback: (error: { code: string; message: string }) => void) {
    return deviceEmitter.addListener(
      'scanError',
      (payload: ScanErrorPayload) => {
        callback({
          code: payload.code,
          message: payload.message,
        });
      }
    );
  },
}