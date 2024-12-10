import { fetchUserData, get, login, logout, register, update, updateAdditionalInfo } from "@/src/apis/services/authService"
import { resetAuthState, setAddtionalData, setIsFirstTime, setLoading, setUser } from "./authSlice"
import { sanitizeFirebaseUser } from "@/src/utils"
import { Alert } from "react-native"
import { saveToken } from "@/src/utils/tokens"
import { UpdateUser } from "@/src/types/index.types"
import { router } from "expo-router"
import { resetDataState } from "../data/dataSlice"
import { getAuth } from "firebase/auth"

// initial user create
export const userRegistrationAsync: any = (info: {email: string, password: string}) => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const registerResponse = await register(info?.email, info?.password)
      if (registerResponse?.status !== 201) {
        throw new Error()
      }
      dispatch(setUser(sanitizeFirebaseUser(registerResponse?.data)))
      // const token = await registerResponse?.data?.getIdToken(); // Get ID token
      // await saveToken("userTokens", token!); // Save securely
      Alert.alert('Success', 'Your signup was successful!');


      // Afert user creation navigate to profile picture update screen
      router.push('/signup/profilepicture')
      dispatch(setLoading(false))
    } catch (error) {
      console.log('register failed : ', error)
      Alert.alert('Failed', 'Your signup was failed!');
      dispatch(setLoading(false))
    }
  }
}

// update use details
export const userUpdateAsync: any = (info: UpdateUser, isInfoPage?: boolean) => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const updateResponse = await update(info, isInfoPage)
      if (updateResponse?.status !== 200) {
        throw new Error()
      }
      
      const getResponse = await get();
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (getResponse?.status === 200) {
        if (isInfoPage) {
          const getAdditional = await fetchUserData(auth.currentUser?.uid!);
          console.log('updated user add  ==> ', getAdditional?.data);
          dispatch(setAddtionalData(getAdditional?.data))
        } 
        dispatch(setUser({...sanitizeFirebaseUser(getResponse?.data)}))
      }
      
      console.log('updated user ', user);
      
      Alert.alert('Success', 'Your update was successful!');
      dispatch(setLoading(false))
      if (isInfoPage) {
        dispatch(setIsFirstTime(false))
        router.replace('/(tabs)')
      } else {
        router.push('/signup/personalinfo')
      }
    } catch (error) {
      console.log('register failed : ', error)
      Alert.alert('Failed', 'Your update was failed!');
      dispatch(setLoading(false))
    }
  }
}

// user login
export const userLoginAsync: any = (info: {email: string, password: string}) => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const loginResponse = await login(info?.email, info?.password)
      if (loginResponse?.status !== 200) {
        throw new Error()
      }
      const getResponse = await get();
      const auth = getAuth();
      const user = auth.currentUser;
      
      if (getResponse?.status === 200) {
        // fetch user's additional data
        const getAdditional = await fetchUserData(auth.currentUser?.uid!);
        console.log('updated user add  ==> ', getAdditional?.data);
        dispatch(setAddtionalData(getAdditional?.data))
        dispatch(setUser(sanitizeFirebaseUser(getResponse?.data)))
        
      }
      // dispatch(setUser(sanitizeFirebaseUser(loginResponse?.data)))

      // const token = await loginResponse?.data?.getIdToken(); // Get ID token
      // await saveToken("userTokens", token!); // Save securely
      dispatch(setIsFirstTime(false))
      dispatch(setLoading(false))
      Alert.alert('Success', 'Your login was successful!');
    } catch (error) {
      console.log('login failed : ', error)
      Alert.alert('Failed', 'Your login was failed!');
      dispatch(setLoading(false))
      
    }
  }
}


// user logout
export const userLogoutAsync: any = (routerFunction: any) => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const loginResponse = await logout()
      if (loginResponse?.status !== 200) {
        throw new Error()
      }
      
      dispatch(resetAuthState())
      dispatch(resetDataState())
      
      routerFunction.replace('/')
      // routerFunction.push('/')
      Alert.alert('Success', 'Your logout was successful!');
    } catch (error) {
      console.log('login failed : ', error)
      Alert.alert('Failed', 'Your logout was failed!');
      dispatch(setLoading(false))
      
    }
  }
}

