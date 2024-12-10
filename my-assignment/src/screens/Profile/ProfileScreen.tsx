import { db } from '@/firebaseConfig';
import BottomButton from '@/src/components/BottomButton';
import { RootState } from '@/src/redux/store';
import { userUpdateAsync } from '@/src/redux/store/auth/authAsync';
import { collection, onSnapshot } from '@firebase/firestore';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

interface ProfileProps {
  isEditMode?: boolean
}

const ProfileScreen = ({isEditMode}: ProfileProps) => {

  const router = useRouter();
  const dispatch = useDispatch()

  const user = useSelector((state: RootState) => state.auth.user)
  const additionData = useSelector((state: RootState) => state?.auth?.additionalData)
  const [editable, setEditable] = useState(isEditMode ? true : false)

  const [firstName, setFirstName] = useState(user?.displayName?.split(' ')?.[0])
  const [lastName, setLastName] = useState(user?.displayName?.split(' ')?.[1])
  const [phone, setPhone] = useState(additionData?.phoneNumber)
  const [email, setEmail] = useState(user?.email)
  const [address, setAddress] = useState(additionData?.address)
  const [photoURL, setPhotoURL] = useState(user?.photoURL)

  console.log("user ==> ", user, additionData)

  const onPressHandler = (info?: any) => {
    isEditMode ? dispatch(userUpdateAsync(info, true)) : router.push("/editprofile")
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            style={styles.profilePicture}
            source={{ uri: photoURL ? photoURL : 'https://via.placeholder.com/100' }} // Replace with actual image URL
          />
          {/* <Text style={styles.title}>Profile</Text> */}
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name</Text>
            <TextInput style={styles.input} value={firstName} editable={editable}  onChangeText={setFirstName}/>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput style={styles.input} value={lastName} editable={editable} onChangeText={setLastName}/>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              editable={false}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput style={styles.input} value={phone} editable={editable} onChangeText={setPhone}/>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mailing address</Text>
            <TextInput style={styles.input} value={address} placeholder="N/A" editable={editable} onChangeText={setAddress}/>
          </View>
        </View>
      </ScrollView>

      {/* <TouchableOpacity style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity> */}
      <BottomButton 
        text={isEditMode ? "Save" : 'Edit'}
        onClickfunctionality={() => onPressHandler({
          email: email,
          displayName: `${firstName} ${lastName}`,
          address: address,
          phoneNumber: phone,
        })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    marginVertical: 16,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    marginVertical: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#f9f9f9',
    color: '#333',
  },
  // editButton: {
  //   backgroundColor: '#E57373',
  //   borderRadius: 8,
  //   padding: 16,
  //   alignItems: 'center',
  //   marginTop: 24,
  // },
  // editButtonText: {
  //   color: '#fff',
  //   fontSize: 16,
  //   fontWeight: 'bold',
  // },
});

export default ProfileScreen;