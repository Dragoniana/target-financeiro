import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },

  option: {
    flex: 1,
    height: 52,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    backgroundColor: colors.white,
  },

  inputSelected: {
    backgroundColor: colors.blue[500],
    borderColor: colors.blue[500],
  },

  outputSelected: {
    backgroundColor: colors.red[500],
    borderColor: colors.red[500],
  },

  optionText: {
    color: colors.gray[500],
    fontSize: 14,
    fontFamily: fontFamily.bold,
  },

  selectedText: {
    color: colors.white,
  },
})