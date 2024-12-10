import { RootState } from "@/src/redux/store";
import { userUpdateAsync } from "@/src/redux/store/auth/authAsync";
import { setIsFirstTime } from "@/src/redux/store/auth/authSlice";
import { UpdateUser } from "@/src/types/index.types";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const PersonalInfoScreen: React.FC = () => {

  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state?.auth?.user)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState(user?.email)
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  const onPressNext = useCallback((info: UpdateUser | null) => {
    if (info) {
      dispatch(userUpdateAsync(info, true))
    } else {
      dispatch(setIsFirstTime(false))
      router.replace('/(tabs)')
    }
  }, [dispatch])
  // defaultValue="Jane"
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Personal info</Text>
        <Text style={styles.subtitle}>
          You can add your personal data now or do it later
        </Text>

        <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName}/>
        <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Phone number" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
        <TextInput
          style={styles.input}
          placeholder="Mailing address"
          // defaultValue="56 O'Mally Road, ST LEONARDS, 2065, NSW"
          value={address}
          onChangeText={setAddress}
        />

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.backButton]} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.nextButton]} 
            disabled={!email}
            onPress={() => onPressNext({
              email: email,
              displayName: `${firstName} ${lastName}`,
              address: address,
              phoneNumber: phone,
            })}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#6d6d6d",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#f2dede",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fdf6f6",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  backButton: {
    backgroundColor: "#f5f5f5",
    marginRight: 10,
  },
  backButtonText: {
    color: "#333",
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: "#f4704c",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PersonalInfoScreen;
