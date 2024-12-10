import { getAPI } from "@/src/apis/services/dataService"
import { setLoading } from "../auth/authSlice"
import { setComments, setEvents, setPosts, setSliderImages } from "./dataSlice"


export const getSilderImages: any = () => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const response = await getAPI({endpoint: 'photos'})
      if (response?.status !== 200) {
        throw new Error()
      }
      dispatch(setSliderImages(response?.data)) // ?.length > 10 ? response?.data?.slice(0, 10) : response?.data
    } catch (error) {
      console.log('get slider images failed : ', error)
      dispatch(setSliderImages([]))
      dispatch(setLoading(false))
    }
  }
}

export const getEvents: any = () => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const response = await getAPI({endpoint: 'users'})
      if (response?.status !== 200) {
        throw new Error()
      }
      dispatch(setEvents(response?.data))
    } catch (error) {
      console.log('get slider images failed : ', error)
      dispatch(setEvents([]))
      dispatch(setLoading(false))
    }
  }
}

export const getPosts: any = () => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const response = await getAPI({endpoint: 'posts'})
      if (response?.status !== 200) {
        throw new Error()
      }
      dispatch(setPosts(response?.data))
    } catch (error) {
      console.log('get slider images failed : ', error)
      dispatch(setPosts([]))
      dispatch(setLoading(false))
    }
  }
}

export const getComments: any = () => {
  return async(dispatch: any) => {
    try {
      dispatch(setLoading(true))
      const response = await getAPI({endpoint: 'comments'})
      if (response?.status !== 200) {
        throw new Error()
      }
      dispatch(setComments(response?.data))
    } catch (error) {
      console.log('get slider images failed : ', error)
      dispatch(setComments([]))
      dispatch(setLoading(false))
    }
  }
}