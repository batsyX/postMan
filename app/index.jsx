
import { View, Text, Image } from 'react-native'
import React, { useEffect,useState } from 'react'
import { router, useNavigation} from "expo-router"
import img from "../assets/images/initial.jpg"
import CustomButton from '../components/CustomButton';
import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import * as Location from 'expo-location';
import { QRProvider } from '../context/QrContext';
import Dialog from "react-native-dialog";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSpring
} from 'react-native-reanimated';

import { Camera } from 'expo-camera';

const index = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();
      setHasLocationPermission(locationStatus === 'granted');

      if (locationStatus === 'granted') {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }


    })();
  }, []);
  if (hasPermission === null) {
    console.log("null")
  }
  else if (hasPermission === false) {
    console.log("not granted")
  }else{
    console.log("granted")
  }

  const {  height } = Dimensions.get("window");
  const customEntering = () => {
    'worklet';
    const animations = {
      originY: withTiming(height-265, { duration: 2000 }), 
      opacity: withTiming(1, { duration: 1000 }),
    };
    const initialValues = {
      originY: 2*height,
      opacity: 0,
    };
    return {
      initialValues,
      animations,
    };
  };


  const handlePress=()=>{
    router.push("/(auth)/Login")
  }
  return (
    <>
    <QRProvider>
      <StatusBar style="dark" />
      <View className="relative h-full ">
        <Image source={img} className="w-full h-full"
          resizeMode='cover'
        />
        <Animated.View entering={customEntering} className="w-full bg-gray-100 h-[300px] absolute bottom-0 rounded-t-3xl flex items-center justify-center">
          <Text className="font-bold text-3xl mb-3">Postman deivery!</Text>
          <Text className="text-md">Deliver parcels with ease</Text>
          <CustomButton text="text-white" title="Contine to login" style="mt-10 bg-black w-[300px]" onPress={handlePress}/>
        </Animated.View> 
      </View>
      
    </QRProvider>
    </>
  )
}

export default index 