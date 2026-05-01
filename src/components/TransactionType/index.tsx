import { MaterialIcons } from '@expo/vector-icons'
import { Pressable, Text, View } from 'react-native'

import { TransactionTypes } from '@/utils/TransactionTypes'
import { colors } from '@/theme'

import { styles } from './styles'

type Props = {
  selected: TransactionTypes
  onChange: (type: TransactionTypes) => void
}

export function TransactionType({ selected, onChange }: Props) {
  const inputSelected = selected === TransactionTypes.Input
  const outputSelected = selected === TransactionTypes.Output

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.option,
          inputSelected && styles.inputSelected,
        ]}
        onPress={() => onChange(TransactionTypes.Input)}
      >
        <MaterialIcons
          name="arrow-upward"
          size={18}
          color={inputSelected ? colors.white : colors.gray[500]}
        />

        <Text
          style={[
            styles.optionText,
            inputSelected && styles.selectedText,
          ]}
        >
          Guardar
        </Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          outputSelected && styles.outputSelected,
        ]}
        onPress={() => onChange(TransactionTypes.Output)}
      >
        <MaterialIcons
          name="arrow-downward"
          size={18}
          color={outputSelected ? colors.white : colors.gray[500]}
        />

        <Text
          style={[
            styles.optionText,
            outputSelected && styles.selectedText,
          ]}
        >
          Resgatar
        </Text>
      </Pressable>
    </View>
  )
}