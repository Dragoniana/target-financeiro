import { StyleSheet } from 'react-native'

import { colors } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 6,
    backgroundColor: colors.gray[200],
    borderRadius: 999,
    overflow: 'hidden',
  },

  bar: {
    height: '100%',
    backgroundColor: colors.blue[500],
    borderRadius: 999,
  },
})