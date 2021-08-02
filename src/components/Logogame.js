import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/game.jpg')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 360,
    height: 210,
    marginBottom: 8,
  },
})
