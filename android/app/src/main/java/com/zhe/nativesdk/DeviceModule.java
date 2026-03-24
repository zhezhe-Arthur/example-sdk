package com.zhe.nativesdk;

import android.content.Context;
import android.os.BatteryManager;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import android.os.Handler;
import android.os.Looper;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class DeviceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private final Handler scanHandler = new Handler(Looper.getMainLooper());
    private boolean isScanning = false;
    private int mockIndex = 0;
    private Runnable scanRunnable;

    public DeviceModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "DeviceModule";
    }

    @ReactMethod
    public void getBatteryLevel(Promise promise) {
        try {
            BatteryManager batteryManager =
                (BatteryManager) reactContext.getSystemService(Context.BATTERY_SERVICE);

            if (batteryManager == null) {
                promise.reject("BATTERY_ERROR", "BatteryManager is null");
                return;
            }

            int batteryLevel = batteryManager.getIntProperty(
                BatteryManager.BATTERY_PROPERTY_CAPACITY
            );

            promise.resolve(batteryLevel);
        } catch (Exception e) {
            promise.reject("BATTERY_ERROR", e);
        }
    }

    @ReactMethod
    public void getUUID(Promise promise) {
        try {
            String androidId = Settings.Secure.getString(
                reactContext.getContentResolver(),
                Settings.Secure.ANDROID_ID
            );

            if (androidId == null || androidId.isEmpty()) {
                promise.reject("UUID_ERROR", "ANDROID_ID is empty");
                return;
            }

            promise.resolve(androidId);
        } catch (Exception e) {
            promise.reject("UUID_ERROR", e);
        }
    }

    @ReactMethod
    public void startScan(Promise promise) {
        try {
            if (isScanning) {
                promise.resolve("scan already started");
                return;
            }

            isScanning = true;
            mockIndex = 0;

            sendScanStateChangeEvent(true);

            scanRunnable = new Runnable() {
                @Override
                public void run() {
                    if (!isScanning) {
                        return;
                    }

                    mockIndex++;

                    WritableMap device = Arguments.createMap();
                    device.putString("id", "MOCK_DEVICE_" + mockIndex);
                    device.putString("name", "Mock Device " + mockIndex);
                    device.putInt("rssi", -40 - mockIndex);

                    sendDeviceFoundEvent(device);

                    if (mockIndex < 5) {
                        scanHandler.postDelayed(this, 1000);
                    } else {
                        isScanning = false;
                        sendScanStateChangeEvent(false);
                    }
                }
            };

            scanHandler.post(scanRunnable);
            promise.resolve("scan started");
        } catch (Exception e) {
            promise.reject("SCAN_ERROR", e);
        }
    }

    @ReactMethod
    public void stopScan(Promise promise) {
        try {
            if (scanRunnable != null) {
                scanHandler.removeCallbacks(scanRunnable);
            }

            boolean wasScanning = isScanning;
            isScanning = false;

            if (wasScanning) {
                sendScanStateChangeEvent(false);
            }

            promise.resolve("scan stopped");
        } catch (Exception e) {
            promise.reject("SCAN_STOP_ERROR", e);
        }
    }

    private void sendDeviceFoundEvent(WritableMap device) {
        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("deviceFound", device);
    }

    private void sendScanStateChangeEvent(boolean scanning) {
        WritableMap params = Arguments.createMap();
        params.putBoolean("scanning", scanning);

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("scanStateChange", params);
    }

    private void sendScanErrorEvent(String code, String message) {
        WritableMap params = Arguments.createMap();
        params.putString("code", code);
        params.putString("message", message);

        reactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("scanError", params);
    }
}