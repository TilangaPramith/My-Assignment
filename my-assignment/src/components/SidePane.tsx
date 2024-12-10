import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const SidePane = ({ onClose }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    padding: 20,
  },
  closeButton: {
    marginBottom: 20,
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuItem: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
});

export default SidePane;
