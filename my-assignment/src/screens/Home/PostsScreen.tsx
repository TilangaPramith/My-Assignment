import { RootState } from '@/src/redux/store'
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react'
import { FlatList, Image, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'


export default function PostsScreen() {
  const [selectedPost, setSelectedPost] = useState(null); // State to hold the selected post for the popup
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
  const posts = useSelector((state: RootState) => state?.data?.posts);

  const handlePostPress = (post: any) => {
    console.log('selected post ==> ', post);
    
    setSelectedPost(post);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedPost(null);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity 
        onPress={() => handlePostPress(item)}
        hitSlop={{ top: 20, bottom: 20, left: 10, right: 10 }}
        style={styles.organizerContainer}>
        <View style={styles.organizerInfo}>
          <Text style={styles.organizerName}>{item.title}</Text>
        </View>
        <View style={styles.chatButton} >
          <Text style={styles.chatButtonText}>💬</Text>
        </View>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.organizersContainer}> 
      {/* style={styles.organizerContainer} */}
        {
          <View >
            <FlatList
              data={posts}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 10 }}
              style={styles.flatListContainer}
              scrollEnabled={posts.length > 10} // Enable scrolling only if there are more than 3 items
              ListEmptyComponent={<Text>No organizers available</Text>}
              nestedScrollEnabled={true}
              keyboardShouldPersistTaps="handled" 
            />
          </View>
        }
        {selectedPost && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{(selectedPost as any)?.title}</Text>
              <Text style={styles.modalDescription}>{(selectedPost as any)?.body}</Text>
              <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  organizerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  organizersContainer: {
    flex: 1,
    maxHeight: "100%", // Adjust to fit three items based on your item height
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  organizerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  flatListContainer: {
    maxHeight: "100%", // Same as the container
  },
  organizerInfo: {
    flex: 1,
    marginHorizontal: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  icon: {
    marginLeft: 10,
    marginRight: 5,
  },
})