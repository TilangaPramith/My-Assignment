import { AuthState, User } from '@/src/types/index.types';
import { sanitizeFirebaseUser } from '@/src/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  loading: false,
  isFirstTime: true,
  additionalData: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = sanitizeFirebaseUser(action.payload);
    },
    logout(state) {
      state = initialState;
    },
    setLoading(state, action) {
      state.loading = action?.payload
    },
    setIsFirstTime(state, action) {
      state.isFirstTime = action?.payload
    },
    resetAuthState(state) {
      state.user = initialState.user
      state.isFirstTime = initialState.isFirstTime
      state.additionalData = initialState?.additionalData
    },
    setAddtionalData(state, action) {
      console.log('come data ==> ', action?.payload);
      
      state.additionalData = action?.payload
    }
  },
});

export const { setUser, logout, setLoading, setIsFirstTime, resetAuthState, setAddtionalData } = authSlice.actions;
export default authSlice.reducer;
