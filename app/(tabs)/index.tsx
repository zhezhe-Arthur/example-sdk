import { Image } from 'expo-image';
import { Platform, StyleSheet, View, Text } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { useEffect } from 'react';
import SDK from "@/sdk";

export default function HomeScreen() {

  useEffect(() => {
    SDK.device.scan().then(res => {
      console.log("scan结果：", res);
    })
    SDK.system.getInfo().then(res => {
      console.log("getInfo结果：", res);
    })
  }, [])

  return (
    <View  style={styles.titleContainer}>
      <Text>
        example-sdk
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
