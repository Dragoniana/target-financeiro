import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },

  title: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fontFamily.bold,
    marginBottom: 8,
  },

  list: {
    width: '100%',
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
})