import { StyleSheet, Text, View } from 'react-native';

import SDK from "@/sdk";
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [level, setLevel] = useState<number | "">()
  const [UUID, setUUID] = useState<string | "">()

  useEffect(() => {
    SDK.device.getBatteryLevel().then(res => {
      setLevel(res.data || "")
    })

    SDK.device.getUUID().then(res => {
      setUUID(res.data || "")
    })
  }, [])

  useEffect(() => {
    const sub1 = SDK.device.onDeviceFound((device) => {
      console.log('发现设备:', device);
    });

    const sub2 = SDK.device.onScanStateChange((scanning) => {
      console.log('扫描状态:', scanning);
    });

    const sub3 = SDK.device.onScanError((error) => {
      console.log('扫描错误:', error);
    });

    const run = async () => {
      const res = await SDK.device.startScan();
      console.log('开始扫描:', res);
    };

    run();

    return () => {
      sub1.remove();
      sub2.remove();
      sub3.remove();

      SDK.device.stopScan().then((res) => {
        console.log('停止扫描:', res);
      });
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
        <View>
          <Text>
            {"电量："}
            {level}
          </Text>
        </View>
        <View>
          <Text>
            {"UUID："}
            {UUID}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "column",
    alignItems: 'center',
    marginTop: "50%"
    // gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
