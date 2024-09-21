import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "expo-router";
import { useQR } from "../../context/QrContext";

export default function home() {
  const {QrData,setQrData} = useQR();
  const navigation =useNavigation();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }) => {
    setScanned(true);
    setQrData(JSON.parse(data));   
    navigation.navigate('mapNe'); 
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>; 
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <SafeAreaView>
    <StatusBar style="dark" />
      <View className="w-full h-full items-center justify-center">
        <Text className=" mb-16 text-3xl">Scan to deliver!</Text>
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarcodeScanned} 
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          facing="back"
          className="w-[300px] h-[300px]"
        />
        {scanned && (
          <TouchableOpacity  onPress={() => setScanned(false)} className=" bg-black w-[200px] h-[75px] mt-16 rounded-xl items-center justify-center" > 
            <Text className="text-white font-2xl">Tap to scan again</Text> 
          </TouchableOpacity>
        )}
    </View>
    </SafeAreaView>
  );
}
