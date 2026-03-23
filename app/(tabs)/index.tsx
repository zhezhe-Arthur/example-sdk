import { StyleSheet, Text, View } from 'react-native';

import SDK from "@/sdk";
import { useEffect, useState } from 'react';

export default function HomeScreen() {
  const [level, setLevel] = useState<number>()
  const [UUID, setUUID] = useState<string>()

  useEffect(() => {
    SDK.device.scan().then(res => {
      // console.log("scan结果：", res);
    })
    SDK.system.getInfo().then(res => {
      // console.log("getInfo结果：", res);
    })

    SDK.device.getBatteryLevel().then(res => {
      setLevel(res.data)
      console.log("电量:", res.data);
      
    })

    SDK.device.getUUID().then(res => {
      setUUID(res.data)
      console.log("UUID:",res.data);
    })
  }, [])

  return (
    <View style={{flex: 1}}>
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
