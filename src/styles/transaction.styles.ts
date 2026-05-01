import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    paddingTop: 56,
    paddingHorizontal: 24,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  title: {
    color: colors.black,
    fontSize: 24,
    fontFamily: fontFamily.bold,
  },

  subtitle: {
    color: colors.gray[500],
    fontSize: 13,
    fontFamily: fontFamily.regular,
    marginTop: 8,
    lineHeight: 18,
  },

  form: {
    marginTop: 32,
    gap: 20,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
})