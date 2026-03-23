package com.zhe.nativesdk;

import android.content.Context;
import android.os.BatteryManager;
import android.provider.Settings;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class DeviceModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

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
}