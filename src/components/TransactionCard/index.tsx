import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import { colors } from '@/theme'

import { styles } from './styles'

export type TransactionType = 'input' | 'output'

type Props = {
  type: TransactionType
  value: string
  date: string
  description: string
  onRemove?: () => void
}

export function TransactionCard({
  type,
  value,
  date,
  description,
  onRemove,
}: Props) {
  const isInput = type === 'input'

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <MaterialIcons
          name={isInput ? 'arrow-upward' : 'arrow-downward'}
          size={22}
          color={isInput ? colors.blue[500] : colors.red[400]}
        />

        <View>
          <Text style={styles.value}>{value}</Text>

          <Text style={styles.description}>
            {date}
            {description ? ` • ${description}` : ''}
          </Text>
        </View>
      </View>

      <Pressable onPress={onRemove} hitSlop={8}>
        <MaterialIcons name="close" size={18} color={colors.gray[500]} />
      </Pressable>
    </View>
  )
}