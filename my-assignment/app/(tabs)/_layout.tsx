import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet } from 'react-native';
import CustomDrawerContent from '@/src/components/CustomDrawer';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

function CustomTabs() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="th-large" color={color} />,
        }}
      />
    </Tabs>
  );
}

// Custom Component for Drawer Content
// function CustomDrawerContent() {
//   return (
//     <View style={styles.drawerContent}>
//       <Text style={styles.drawerText}>This is the Side Pane</Text>
//     </View>
//   );
// }

export default function TabLayout() {
  return (
    // <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          headerShown: false,
          drawerStyle: {
            backgroundColor: 'white',
            width: 240,
          },
        }}
        drawerContent={() => <CustomDrawerContent />}
      >
        <Drawer.Screen name="MainTabs" component={CustomTabs} />
      </Drawer.Navigator>
    // {/* </NavigationContainer> */}
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});




