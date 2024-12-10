import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { userLogoutAsync } from "../redux/store/auth/authAsync";
import { useRouter } from "expo-router";


export default function CustomDrawerContent(props: any) {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.auth.user)
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* User Info */}
      <View style={styles.userInfoSection}>
        <Image
          source={{ uri: user?.photoURL ? user?.photoURL : "https://randomuser.me/api/portraits/women/44.jpg" }} // Example avatar
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.displayName}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Logout Button */}
      <DrawerItem
        label="Logout"
        onPress={() => dispatch(userLogoutAsync(router))}
        labelStyle={styles.logoutLabel}
        icon={() => <Text style={styles.logoutIcon}>🔴</Text>}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.version}>Version 0.0.1</Text>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f4f4f4",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  logoutLabel: {
    color: "red",
    fontSize: 16,
  },
  logoutIcon: {
    marginRight: 10,
    fontSize: 16,
  },
  footer: {
    marginTop: "auto",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f4f4f4",
  },
  version: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
});
