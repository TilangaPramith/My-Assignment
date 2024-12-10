import LoginScreen from "@/src/screens/Auth/LoginScreen";
import { Text, View } from "react-native";
import registerNNPushToken from 'native-notify';

export default function Index() {
  registerNNPushToken(25289, 'h7Y8NVRyMgDU1ohh0f2QPN');
  return (
    <LoginScreen/>
  );
}
