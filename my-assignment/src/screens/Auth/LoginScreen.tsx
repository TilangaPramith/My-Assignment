import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { userLoginAsync } from '@/src/redux/store/auth/authAsync';
import { AuthState } from '@/src/types/index.types';
import { RootState } from '@/src/redux/store';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  const user = useSelector((state: RootState) => state?.auth?.user)
  const isFirstTime = useSelector((state: RootState) => state?.auth?.isFirstTime)
  const dispatch = useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  const userLogin = useCallback((info: {email: string, password: string}) => {
    dispatch(userLoginAsync(info))
  }, [dispatch])


  // logged user navigate to home screen
  useEffect(() => {
    if (!isFirstTime && user) {
      router.replace('/(tabs)')
    }
  }, [user, isFirstTime])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>Welcome to your Portal</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="#BDBDBD" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="your.email@gmail.com"
          placeholderTextColor="#BDBDBD"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="#BDBDBD" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#BDBDBD"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!isPasswordVisible}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          style={styles.passwordToggle}
        >
          <Ionicons
            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>

      {/* Restore Password Link */}
      <TouchableOpacity style={styles.restorePasswordContainer}>
        <Text style={styles.restorePasswordText}>Restore password</Text>
        <Ionicons name="arrow-forward-outline" size={16} color="#FF6F61" />
      </TouchableOpacity>

      {/* Buttons */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => userLogin({email, password})}>
        <Text style={styles.buttonText}>Login</Text>
        <Ionicons name="arrow-forward-outline" size={16} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
        <Ionicons name="arrow-forward-outline" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E8E',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#F8F8F8',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  passwordToggle: {
    marginLeft: 10,
  },
  restorePasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  restorePasswordText: {
    color: '#FF6F61',
    marginRight: 5,
    fontSize: 14,
  },
  buttonPrimary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    marginVertical: 10,
  },
  buttonSecondary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default LoginScreen;
