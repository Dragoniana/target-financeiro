import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native'

import { colors } from '@/theme'

import { styles } from './styles'

type Props = PressableProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
        isLoading && styles.loading,
      ]}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  )
}