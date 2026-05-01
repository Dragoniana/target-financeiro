import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },

  label: {
    color: colors.gray[500],
    fontSize: 12,
    fontFamily: fontFamily.medium,
  },

  input: {
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 14,
    color: colors.black,
    fontSize: 14,
    fontFamily: fontFamily.regular,
  },
})