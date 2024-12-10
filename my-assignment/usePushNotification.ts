import {useState, useEffect, useRef}  from 'react'

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications'

import Constants from 'expo-constants'

import { Alert, Platform } from 'react-native';

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotitifcation] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.EventSubscription>();
  const responseListener = useRef<Notifications.EventSubscription>();

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device?.isDevice) {
      const {status: exisitingStatus} = await Notifications.getPermissionsAsync();

      let finalStatus = exisitingStatus;

      if (exisitingStatus !== "granted") {
        const {status} = await Notifications.requestPermissionsAsync();
        finalStatus = status
      }
      if (finalStatus !== "granted") {
        Alert.alert("Failed to get push token")
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants?.expoConfig?.extra?.eas?.projectId
      });

      if (Platform.OS === "android") {
        Notifications?.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        })
      }
    } else {
      console.log("ERROR: Plase use physical device")
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token!)
    });

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotitifcation(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!)
      Notifications.removeNotificationSubscription(responseListener.current!)
    }
  }, []);


  return {
    expoPushToken,
    notification,
  }
}