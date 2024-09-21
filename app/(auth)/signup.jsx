import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import React, {  useState } from 'react'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../../components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from '../../config/FireBaseConfig';
import { createUserWithEmailAndPassword } from "firebase/auth";


const sign = () => {

  const[email,setEmail]=useState("");
  const[password,setPass]=useState("");
  const[fName,setFname]=useState("");  

  const createAcc=()=>{

    if(!email && !password && !fName){
        ToastAndroid.show("Fill in all the details!",ToastAndroid.LONG);
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      ToastAndroid.show("Success!",ToastAndroid.LONG); 
      router.push("home");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if(errorCode=="auth/email-already-in-use"){
        ToastAndroid.show("email-already-in-use",ToastAndroid.LONG);   
      }else if(errorCode=="auth/weak-password"){
        ToastAndroid.show("Password must be more than 6 characters",ToastAndroid.LONG);
      }else if(errorCode=="auth/invalid-email"){
        ToastAndroid.show("invalid-email",ToastAndroid.LONG);
      }
      
    });
  }

  return (
    <SafeAreaView className=" h-full">
      <StatusBar style="dark"/>
      <ScrollView>
        <View className=" h-full p-4">
          <TouchableOpacity onPress={()=>router.back()}>
            <Ionicons name="caret-back-sharp" size={24} color="black" />
          </TouchableOpacity>
          <Text className=" font-bold text-4xl pt-20">Create account in just one step!</Text>
          <View className="w-5/6 h-[6px] bg-black mt-1 rounded-lg"></View>
          <View className="mt-10 items-center">
            <TextInput 
              className=" border-2  px-4 py-4 rounded-lg w-full"
              placeholder='Full Name'
              cursorColor="#000000"
              placeholderTextColor="#000000"
              onChangeText={(text)=>setFname(text)}
            />
            <TextInput 
              className=" border-2  px-4 py-4 rounded-lg mt-10 w-full"
              placeholder='Enter your email'
              cursorColor="#000000"
              placeholderTextColor="#000000"
              onChangeText={(text)=>setEmail(text)}
            />
            <TextInput 
              secureTextEntry={true}
              className=" border-2  px-4 py-4 rounded-lg mt-10 w-full"
              placeholder='Password'
              cursorColor="#000000"
              placeholderTextColor="#000000"
              onChangeText={(text)=>setPass(text)}
            />
            <CustomButton
              title="Create account"
              style="mt-10 w-[350px] bg-black rounded-lg "
              text="text-white"
              onPress={createAcc}
            />
            <CustomButton
              title="Sign in"
              style="mt-10  w-[350px] rounded-lg border-2 "
              text="text-black"
              onPress={() => {router.replace("/(auth)/Login")}}  
            />
            
          </View>

        </View>
      </ScrollView>  
    </SafeAreaView>
  )
}

export default sign