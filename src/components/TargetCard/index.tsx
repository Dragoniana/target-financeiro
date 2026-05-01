import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, PressableProps, Text, View } from 'react-native'

import { colors } from '@/theme'

import { styles } from './styles'

type Props = PressableProps & {
  title: string
  percentage: number
  currentValue: string
  targetValue: string
}

export function TargetCard({
  title,
  percentage,
  currentValue,
  targetValue,
  ...rest
}: Props) {
  return (
    <Pressable style={styles.container} {...rest}>
      <View>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {percentage}% • {currentValue} de {targetValue}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={22} color={colors.gray[600]} />
    </Pressable>
  )
}