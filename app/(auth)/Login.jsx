import { View, Text, TextInput,TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import CustomButton from '../../components/CustomButton'
import { auth } from '../../config/FireBaseConfig'
import {  signInWithEmailAndPassword } from "firebase/auth";
import Ionicons from '@expo/vector-icons/Ionicons';

const Login = () => {
  const [email,setUsername]=useState();
  const [password,setPass]=useState();
  

  const handlePress=()=>{
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    router.replace('home');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
  }
  return (
    <SafeAreaView className="h-full">
          <StatusBar style="dark"/>
        <ScrollView >
          <TouchableOpacity onPress={()=>router.back()} className="m-4">
            <Ionicons  name="caret-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <View >
            <Text className="text-4xl font-bold ml-5 mt-16">Welcome back!</Text>
            <View className="w-5/6 h-[6px] bg-black rounded-lg ml-5"></View>
            <Text className="text-xl pl-6">Login to start delivering.</Text>
          </View>
          <View>
            <TextInput
              className='border-2 p-6 mx-6 mt-10 rounded-xl text-lg'
              placeholder='email'
              value={email}
              onChangeText={(text)=>setUsername(text)}
            />
            <TextInput
              secureTextEntry
              className='border-2 p-6 mx-6 mt-10 rounded-xl text-lg'
              placeholder='Password'
              value={password}
              onChangeText={(text)=>setPass(text)}
            />
            <CustomButton
              title="Login"
              style="bg-black m-6"
              onPress={handlePress}
              text="text-white"
            />
            <CustomButton
              title="Create a new account"
              style="mx-6  border-2"
              text="text-black"
              onPress={() => {router.replace("/(auth)/signup")}}  
            />
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default Login