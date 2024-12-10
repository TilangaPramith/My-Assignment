export interface AuthState {
  user: User,
  loading: boolean,
  isFirstTime: boolean,
  additionalData: any,
}

export interface DataState {
  sliderPhotos: string[] | [],
  events: any[] | [],
  posts: any[] | [],
  comments: any[] | []
}

export type User = {
  uid: any;
  email: any;
  displayName: any;
  photoURL: any;
  emailVerified: any;
  phoneNumber: string;
  address: string;
  additional?: any;
} | null

export type UpdateUser = {
  displayName?: string,
  photoURL?: string, // URL or base64 image
  address?: string,
  phoneNumber?: string,
  email?: string
}