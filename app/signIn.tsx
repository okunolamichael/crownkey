import { View, Text, ScrollView, Image, TouchableOpacity, Alert, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { account, login } from '@/lib/appwrite'
import { useGlobalContext } from '@/lib/global-provider'
import { Link, Redirect } from 'expo-router'


// What is going to happen.
// If the user is logged in (isLoggedIn), it redirects to the home screen (<Redirect href="/" />).
// The handleLogin function calls login() (from appwrite.ts) when the button is tapped.
// The UI shows an image, a welcome message, and a button.

const SignIn = () => {

  const {refetch, loading, isLoggedIn} = useGlobalContext();



  if(isLoggedIn) return <Redirect href="/"/>;

  // If still checking, show nothing (or a loading spinner)
  if (loading) return <SafeAreaView><Text>Checking...</Text></SafeAreaView>;

  const handleLogin = async () => {
    const result = await login();

    if (result) {
      refetch();
      
      // You can now navigate to the home screen or wherever you want after successful login
    } else {
      // Handle login failure (e.g., show an error message)
      Alert.alert("Login failed", "Please try again.");
    }
  }

  return (
    <SafeAreaView className='bg-white h-full'>
      <ScrollView contentContainerClassName='h-full'>
        <Image source={images.onboarding} className="w-full h-3/5" resizeMode="contain" />

        <View className='px-10'>
          <Text className='text-base text-center uppercase font-rubik text-black-200'>
            Welcome to Crownkey Real Estate
          </Text>

          <Text className='text-3xl font-Rubik-bold text-black-300 text-center mt-2'>
            Let's Get You Closer to {'\n'}
            <Text className='text-primary-300'>Your Dream Home</Text>
          </Text>

          <Text className='text-lg font-rubik text-black-200 text-center mt-12'>
            Sign Up to Crownkey <Link href={"/Signup"} className='text-primary-300'>Sign Up</Link> 
            
          </Text>

          <TouchableOpacity onPress={handleLogin} className='bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5'>
            <View className='flex flex-row items-center justify-center'>
              <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
              <Text className='text-lg font-Rubik-medium text-black-300 ml-2'>
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>

          <View className='flex flex-row justify-center mt-5'>
            <TouchableOpacity>
            <Image source={icons.facebook} className='w-7 h-7 mr-5' resizeMode='contain' />
            </TouchableOpacity>
            <TouchableOpacity> 
            <Image source={icons.google} className='w-7 h-7 mr-5'/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={icons.twitter} className='w-7 h-7 mr-5'/>
            </TouchableOpacity>


          </View>
          <View className='flex flex-row justify-center text-center text-base font-rubik text-black-200 mt-5'>
            <Text>
              Already have an account? {""}
            </Text>
            <Pressable className='items-center'><Link href={"/Signingin"} className='text-primary-300'>Sign In</Link></Pressable>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn