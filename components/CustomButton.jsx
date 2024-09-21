import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
        <View className={` p-4 rounded-md ${props.style}`}>
            <Text className={` text-center ${props.text}`}>{props.title}</Text>
        </View>
    </TouchableOpacity>
  )
}

export default CustomButton