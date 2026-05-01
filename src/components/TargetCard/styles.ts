import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 64,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    color: colors.black,
    fontSize: 14,
    fontFamily: fontFamily.bold,
  },

  description: {
    color: colors.gray[500],
    fontSize: 11,
    fontFamily: fontFamily.medium,
    marginTop: 4,
  },
})