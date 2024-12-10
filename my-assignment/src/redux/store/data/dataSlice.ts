import { AuthState, DataState, User } from '@/src/types/index.types';
import { sanitizeFirebaseUser } from '@/src/utils';
import { createSlice } from '@reduxjs/toolkit';

const initialState: DataState = {
  sliderPhotos: [],
  events: [],
  posts: [],
  comments: []
}

const dataSlice = createSlice({
  name: 'data',
  initialState: initialState,
  reducers: {
    setSliderImages(state, action) {
      state.sliderPhotos = action?.payload;
    },
    setEvents(state, action) {
      state.events = action?.payload;
    },
    setPosts(state, action) {
      state.posts = action?.payload;
    },
    setComments(state, action) {
      state.comments = action?.payload;
    },
    resetDataState(state) {
      state.sliderPhotos = initialState.sliderPhotos
      state.events = initialState.events
      state.posts = initialState.posts
      state.comments = initialState.comments
    }
  },
});

export const { setSliderImages, setEvents, setPosts, setComments, resetDataState} = dataSlice.actions;
export default dataSlice.reducer;
