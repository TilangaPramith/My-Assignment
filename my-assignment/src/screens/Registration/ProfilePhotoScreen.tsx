import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { update } from '@/src/apis/services/authService';
import { userUpdateAsync } from '@/src/redux/store/auth/authAsync';


const ProfilePhotoScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {      
      setImage(result?.assets[0]?.uri!);
    }
  };

  const onPressNext = useCallback((info: {imageUri?: string}) => {
    if (info?.imageUri) {
      dispatch(userUpdateAsync({
        photoURL: info?.imageUri,
      }))
    } else {
      router.push('/signup/personalinfo')
    }
  }, [dispatch])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        You are logged in for the first time and can upload a profile photo
      </Text>

      {/* Profile Photo Placeholder */}
      <View style={styles.photoContainer}>
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {/* <Ionicons name="camera-outline" size={30} color="#FF6F61" /> */}
          {image ? <Image source={{ uri: image }} style={styles.photoContainer} /> : <Ionicons name="camera-outline" size={30} color="#FF6F61" />}
        </TouchableOpacity>
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.buttonPrimary} onPress={() => onPressNext({imageUri: image!})}>
        <Text style={styles.buttonText}>Next</Text>
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
    textAlign: 'center',
    marginVertical: 10,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FCEAE6',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  photoButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPrimary: {
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
  image: {
    width: 120,
    height: 120,
  },
});

export default ProfilePhotoScreen;