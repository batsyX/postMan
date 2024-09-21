import { View, Text } from 'react-native'
import React from 'react'
import { Stack, Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import Ionicons from '@expo/vector-icons/Ionicons';
import { QRProvider } from '../../context/QrContext';

const _layout = () => {

  return (
    <QRProvider>
      <Tabs screenOptions={{headerShown:false,tabBarActiveTintColor:"black"}} >
        <Tabs.Screen name="home" 
          options={{
            tabBarIcon:({color,size})=>{return <Ionicons name="scan-sharp" size={24} color={color} /> },
            tabBarLabel:"Scan",
            tabBarLabelStyle:{fontSize:14,marginBottom:5},  
            tabBarStyle:{borderRadius:20,marginBottom:5,height:60,borderColor:"black",borderWidth:2,borderTopWidth:2,marginHorizontal:10,width:200 ,alignSelf:"center" }  ,     
            }}
        />
        <Tabs.Screen name="mapNe" 
          options={{
            tabBarIcon:({color,size})=>{return <Feather name="map-pin" size={24} color={color} /> },  
            tabBarLabelStyle:{fontSize:14,marginBottom:5},
            tabBarStyle:{borderRadius:20,marginBottom:5,height:60,borderColor:"black",borderWidth:2,borderTopWidth:2,marginHorizontal:10,width:200,alignSelf:"center" }  
            }}
        />
      </Tabs>
    </QRProvider>
    
  )
} 

export default _layout