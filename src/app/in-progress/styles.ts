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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  title: {
    color: colors.black,
    fontSize: 22,
    fontFamily: fontFamily.bold,
    marginBottom: 28,
  },

  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 10,
  },

  label: {
    color: colors.gray[500],
    fontSize: 12,
    fontFamily: fontFamily.medium,
    marginBottom: 4,
  },

  values: {
    color: colors.black,
    fontSize: 15,
    fontFamily: fontFamily.bold,
  },

  targetValue: {
    color: colors.gray[500],
    fontSize: 13,
    fontFamily: fontFamily.medium,
  },

  percentage: {
    color: colors.blue[500],
    fontSize: 13,
    fontFamily: fontFamily.bold,
  },

  transactionsHeader: {
    marginTop: 40,
    marginBottom: 12,
  },

  transactionsTitle: {
    color: colors.black,
    fontSize: 16,
    fontFamily: fontFamily.bold,
  },

  transactionsList: {
    width: '100%',
  },

  emptyText: {
    color: colors.gray[500],
    fontSize: 13,
    fontFamily: fontFamily.regular,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
})