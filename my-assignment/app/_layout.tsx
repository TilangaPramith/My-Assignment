import { Stack } from "expo-router";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { store } from '../src/redux/store'
import { usePushNotifications } from "@/usePushNotification";

export default function RootLayout() {

  const {expoPushToken, notification} = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}/>
        <Stack.Screen name="signup/index" options={{headerShown: false}}/>
        <Stack.Screen name="signup/profilepicture" options={{headerShown: false}}/>
        <Stack.Screen name="signup/personalinfo" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="editprofile" options={{headerShown: false}}/>
        <Stack.Screen name="posts" options={{headerShown: true, title: 'Posts'}}/>
      </Stack>
    </Provider>
  );
}
