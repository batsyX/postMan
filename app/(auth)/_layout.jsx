import React from 'react'
import { auth } from '../../config/FireBaseConfig'
import Home from '../(tabs)/home'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
  <>
    {auth.currentUser? <Home/>:
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen  name='Login'/>
    </Stack>
    
    }
  </>
    
  )
}

export default _layout