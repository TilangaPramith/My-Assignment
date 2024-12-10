import { RootState } from "@/src/redux/store";
import { getComments, getEvents, getPosts, getSilderImages } from "@/src/redux/store/data/dataAsync";
import { router } from "expo-router";
import React, { Fragment, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Swiper from "react-native-swiper";
import { useDispatch, useSelector } from "react-redux";

const HomePageScreen: React.FC = () => {

  const dispatch = useDispatch();

  const sliderPhotos = useSelector((state: RootState) => state?.data?.sliderPhotos)
  const users = useSelector((state: RootState) => state?.data?.events)
  const posts = useSelector((state: RootState) => state?.data?.posts)
  const comments = useSelector((state: RootState) => state?.data?.comments)

  const [drawerImages, setDrawerImages] = useState(sliderPhotos?.slice(0, 10));

  useEffect(() => {
    setDrawerImages(sliderPhotos?.slice(0, 10))
  }, [sliderPhotos])


  useEffect(() => {
    dispatch(getSilderImages())
    dispatch(getEvents())
    dispatch(getPosts())
    // dispatch(getComments())
  }, [])


  const renderPagination = (index: number, total: number) => null

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.organizerContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/40" }}
          style={styles.organizerImage}
        />
        <View style={styles.organizerInfo}>
          <Text style={styles.organizerName}>{item.name}</Text>
          <Text style={styles.organizerEmail}>{item.email}</Text>
        </View>
        <TouchableOpacity style={styles.chatButton}>
          <Text style={styles.chatButtonText}>💬</Text>
        </TouchableOpacity>
      </View>
    )
  }

  const renderHorzontalItem = ({item}: any) => {
    return (
      <View style={styles.photoCard}>
        <Image source={{ uri: item.url }} style={styles.photoImage} />
        <Text style={styles.photoTitle}>{item?.title}</Text>
        <Text style={styles.photoDescription}>{item?.description}</Text>
      </View>
    )
  }

  return (
    <ScrollView 
      style={styles.container}
      // contentContainerStyle={{ flexGrow: 1 }}
      // keyboardShouldPersistTaps="handled"
      nestedScrollEnabled={true}
      >
      {/* Image Slider Section */}
      <View style={styles.sliderContainer}>
        <Swiper
          style={styles.wrapper}
          showsButtons={false}
          autoplay={false}
          // autoplayTimeout={3}
          loop={true}
          renderPagination={(index, total) => renderPagination(index, total)}
        >
          {drawerImages?.map((image: any, index) => (
            <Fragment key={`${index}-${image?.id}`}>
              <Image
                key={`${index}-${image?.id}}`}
                source={{ uri: image?.url }}
                style={styles.bannerImage}
              />
              <View style={styles.paginationStyle}>
                <Text style={{ color: 'grey' }}>
                  <Text style={styles.imageCounter}>{index + 1}/{drawerImages?.length}</Text>
                </Text>
              </View>
            </Fragment>
          ))}
        </Swiper>
      </View>

      {/* Details Container Section */}
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>Event Name</Text>
        <Text style={styles.eventAddress}>
          56 O'Mally Road, ST LEONARDS, 2065, NSW
        </Text>

        <Text style={styles.sectionTitle}>Organizers</Text>
        {
          <View style={styles.organizersContainer}>
            <FlatList
              data={users}
              keyExtractor={(item) => `${item.id.toString()}-${item?.name}`}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
              style={styles.flatListContainer}
              scrollEnabled={users.length > 3} // Enable scrolling only if there are more than 3 items
              ListEmptyComponent={<Text>No organizers available</Text>}
              nestedScrollEnabled={true}
            />
          </View>
        }

        <View style={styles.photosHeader}>
          <Text style={styles.sectionTitle}>Photos</Text>
          <TouchableOpacity>
            <Text style={styles.allPhotosText}>All Photos ›</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={drawerImages}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item: any) => `${item.id.toString()}-${item?.title}`}
          renderItem={renderHorzontalItem}
          nestedScrollEnabled={true}
        />
        <View style={{...styles.footerText, marginTop: 20}}>
          <TouchableOpacity onPress={() => router.push('/posts')}>
            <Text style={styles.footerTitleText}>{posts?.length} </Text>
          </TouchableOpacity>
          <Text style={styles.footerText}>Posts</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    height: 200,
  },
  wrapper: {},
  bannerImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  detailsContainer: {
    padding: 15,
  },
  eventName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  eventAddress: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  organizerInfo: {
    flex: 1,
  },
  organizerName: {
    fontSize: 14,
    fontWeight: "600",
  },
  organizerEmail: {
    fontSize: 12,
    color: "#666",
  },
  chatButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  chatButtonText: {
    fontSize: 14,
  },
  footerText: {
    fontSize: 14,
    textAlign: "center",
    // marginTop: 20,
    color: "#666",
  },
  footerTitleText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    color: "#f4704c",
  },
  imageContainer: {
    position: "relative",
  },
  imageCounter: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    color: "#fff",
    padding: 5,
    borderRadius: 5,
    fontSize: 12,
  },
  photosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 10,
  },
  allPhotosText: {
    color: "#f4704c",
    fontSize: 14,
  },
  photoCard: {
    width: 150,
    marginRight: 10,
  },
  photoImage: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    marginBottom: 5,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 3,
  },
  photoDescription: {
    fontSize: 12,
    color: "#666",
  },
  paginationStyle: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  paginationText: {
    color: 'white',
    fontSize: 20
  },
  organizersContainer: {
    flex: 1,
    maxHeight: 180, // Adjust to fit three items based on your item height
    marginBottom: 20,
  },
  flatListContainer: {
    maxHeight: 200, // Same as the container
  },
  horizontalImageContainer: {
    marginBottom: 20, // Add spacing between this section and others
    paddingHorizontal: 15, // Padding for alignment
  },
  horizontalImageCard: {
    marginRight: 10, // Space between images
  },
  horizontalImage: {
    width: 150, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 10,
    backgroundColor: "#f0f0f0", // Placeholder background
  },
});

export default HomePageScreen;
