import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 48,
    backgroundColor: colors.blue[500],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    color: colors.white,
    fontSize: 14,
    fontFamily: fontFamily.bold,
  },

  pressed: {
    opacity: 0.8,
  },

  loading: {
    opacity: 0.7,
  },
})