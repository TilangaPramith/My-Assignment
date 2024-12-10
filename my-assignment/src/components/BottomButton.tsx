import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'

interface BottomButtonProps {
  text: string,
  onClickfunctionality: (arg?: any) => void
}

export default function BottomButton({
  text,
  onClickfunctionality
}: BottomButtonProps) {
  return (
    <TouchableOpacity style={styles.bottomButton} onPress={() => onClickfunctionality()}>
      <Text style={styles.bottomButtonText}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  bottomButton: {
    backgroundColor: '#E57373',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
