import { RootState } from '@/src/redux/store'
import ProfileScreen from '@/src/screens/Profile/ProfileScreen'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function profile() {
  const user = useSelector((state: RootState) => state.auth.user)

  useEffect(() => {
    if (!user) {
      router.replace('/')
    }
  }, [user])
  return (
    <ProfileScreen/>
  )
}
