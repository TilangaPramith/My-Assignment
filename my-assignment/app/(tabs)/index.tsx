import { db } from '@/firebaseConfig'
import { RootState } from '@/src/redux/store'
import HomePageScreen from '@/src/screens/Home/HomePageScreen'
import { collection, onSnapshot } from '@firebase/firestore'
import { router } from 'expo-router'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function index() {
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user])

  
  return (
    <HomePageScreen/>
  )
}


