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
      console.log(res);
      
    })

    SDK.device.getUUID().then(res => {
      setUUID(res.data)
      console.log(res);
    })
  }, [])

  return (
    <View style={styles.titleContainer}>
      <Text>
        example-sdk
      </Text><View>
        <Text>
          {level}
        </Text>
      </View>
      <View>
        <Text>
          {UUID}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
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
