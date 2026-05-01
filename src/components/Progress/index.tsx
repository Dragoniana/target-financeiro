import { View } from 'react-native'

import { styles } from './styles'

type Props = {
  percentage: number
}

export function Progress({ percentage }: Props) {
  const safePercentage = Math.max(0, Math.min(percentage, 100))

  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${safePercentage}%` }]} />
    </View>
  )
}