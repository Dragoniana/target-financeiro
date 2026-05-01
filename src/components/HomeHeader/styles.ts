import { StyleSheet } from 'react-native'

import { colors, fontFamily } from '@/theme'

export const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 24,
    paddingBottom: 28,
  },

  label: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fontFamily.regular,
    opacity: 0.8,
  },

  total: {
    color: colors.white,
    fontSize: 28,
    fontFamily: fontFamily.bold,
    marginTop: 4,
  },

  divider: {
    height: 1,
    backgroundColor: colors.blue[300],
    opacity: 0.3,
    marginTop: 24,
    marginBottom: 20,
  },

  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  summaryLabel: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fontFamily.medium,
    opacity: 0.8,
  },

  summaryValue: {
    color: colors.white,
    fontSize: 16,
    fontFamily: fontFamily.medium,
    marginTop: 4,
  },
})