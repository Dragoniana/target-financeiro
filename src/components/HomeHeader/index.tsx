import { MaterialIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, View } from 'react-native'

import { colors } from '@/theme'

import { styles } from './styles'

export function HomeHeader() {
  return (
    <LinearGradient
      colors={[colors.blue[500], colors.blue[800]] as const}
      style={styles.container}
    >
      <Text style={styles.label}>Total que você possui</Text>

      <Text style={styles.total}>R$ 2.680,00</Text>

      <View style={styles.divider} />

      <View style={styles.summary}>
        <View>
          <View style={styles.summaryHeader}>
            <MaterialIcons name="arrow-upward" size={14} color={colors.green[500]} />
            <Text style={styles.summaryLabel}>Entradas</Text>
          </View>

          <Text style={styles.summaryValue}>R$ 6.184,90</Text>
        </View>

        <View>
          <View style={styles.summaryHeader}>
            <MaterialIcons name="arrow-downward" size={14} color={colors.red[400]} />
            <Text style={styles.summaryLabel}>Saídas</Text>
          </View>

          <Text style={styles.summaryValue}>-R$ 883,65</Text>
        </View>
      </View>
    </LinearGradient>
  )
}