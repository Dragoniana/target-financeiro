import CurrencyInputLib from 'react-native-currency-input'
import { Text, View } from 'react-native'

import { colors } from '@/theme'

import { styles } from './styles'

type Props = {
  label: string
  value: number | null
  onChangeValue: (value: number | null) => void
}

export function CurrencyInput({ label, value, onChangeValue }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <CurrencyInputLib
        value={value}
        onChangeValue={onChangeValue}
        prefix="R$ "
        delimiter="."
        separator=","
        precision={2}
        minValue={0}
        placeholder="R$ 0,00"
        placeholderTextColor={colors.gray[500]}
        style={styles.input}
      />
    </View>
  )
}