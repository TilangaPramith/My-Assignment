import { Alert } from "react-native";
import { auth, db } from "../../../firebaseConfig";
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { UpdateUser } from "@/src/types/index.types";
import { router } from "expo-router";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// User Registration Function
export const register = async (email: string, password: string) => {
  try {
    const response = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered successfully:", response.user.email);
    return Promise.resolve({
			status: 201,
			data: response?.user,
			error: false
		});
  } catch (error) {
    console.error("Login failed:", error);
    return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
    // throw error;
  }
};

export const update = async (info: UpdateUser, isAdditional?: boolean) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const response = await updateProfile(user!, info);

    const userId = auth.currentUser?.uid;

    if (isAdditional) {
      const updateAdditionResponse = await updateAdditionalInfo(userId!, info)
    }
      

    if (!userId) {
      throw new Error('User is not logged in');
    }

    // Reference to the user's document in Firestor
    console.log("User updated successfully:", response,);
    return Promise.resolve({
			status: 200,
			data: response,
			error: false
		});
  } catch (error) {
    console.error("Login failed:", error);
    return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
    // throw error;
  }
};

export const updateAdditionalInfo = async (uid: string, data: any) => {
  try {
    const userDocRef = doc(db, 'users', uid);

  // Check if the document exists
    const docSnapshot = await getDoc(userDocRef);
    if (docSnapshot.exists()) {
      // If the document exists, update it
      await updateDoc(userDocRef, data);
      console.log('User updated successfully');
    } else {
      // If the document doesn't exist, create it
      await setDoc(userDocRef, { ...data });
      console.log('User document created successfully');
    }
    return {
      status: 200,
      data,
      error: false,
    };
  } catch (error) {
    console.error("Failed to update additional info:", error);

    return {
      status: 500,
      data: null,
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const fetchUserData = async (userId: string) => {
  try {
    // Reference to the user's document
    const userRef = doc(db, "users", userId);

    // Fetch the document
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // Document data
      console.log("User data:", userSnap.data());
      return {
        status: 200,
        data: userSnap.data(),
        error: false,
      };
      // return userSnap.data();
    } else {
      return {
        status: 200,
        data: null,
        error: false,
      };
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      status: 500,
      data: null,
      error: true,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

export const get = async() => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    console.log('User ID:', user.uid);
    console.log('Email:', user.email);
    console.log('Display Name:', user.displayName);
    console.log('Photo URL:', user.photoURL);
    console.log('user ==> ', user)
    return Promise.resolve({
			status: 200,
			data: user,
			error: false
		});
  } else {
    console.log('No user is signed in.');
    return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
  }
};

// Sign-In Function
export const login = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in successfully:", response.user.email);
    // Alert("")
    // return userCredential.user;
    return Promise.resolve({
			status: 200,
			data: response?.user,
			error: false
		});
  } catch (error) {
    console.error("Login failed:", error);
    return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
    // throw error;
  }
};

// export const postAzureAPI = async(info: APIInputType): Promise<APIOutputType> => {
//   try {
// 		const response = await azureInstance.post(info?.endpoint, info?.data);
// 		return Promise.resolve({
// 			status: response?.status,
// 			data: response?.data,
// 			error: false
// 		});
// 	} catch (error) {
// 		console.log('postAzureAPI error ==> ', error);
// 		return Promise.resolve({
// 			status: 500,
// 			data: null,
// 			error: true
// 		});
// 	}
// }

// Sign-Out Function
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Logged out successfully");
    // router.replace('/')
    return Promise.resolve({
			status: 200,
			data: null,
			error: true
		});
  } catch (error) {
    console.error("Logout failed:", error);
    return Promise.resolve({
			status: 500,
			data: null,
			error: true
		});
  }
};
