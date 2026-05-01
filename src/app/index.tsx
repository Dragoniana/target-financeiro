import { router } from 'expo-router'
import { ScrollView, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { HomeHeader } from '@/components/HomeHeader'
import { TargetCard } from '@/components/TargetCard'
import { useTargets } from '@/contexts/TargetsContext'
import { formatCurrency } from '@/utils/formatCurrency'

import { styles } from '../styles/home.styles'

export default function Home() {
  const {
    targets,
    getTargetBalance,
    getTargetPercentage,
    getTotalBalance,
    getTotalInput,
    getTotalOutput,
  } = useTargets()

  return (
    <View style={styles.container}>
      <HomeHeader
        total={formatCurrency(getTotalBalance())}
        input={formatCurrency(getTotalInput())}
        output={`-${formatCurrency(getTotalOutput())}`}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Metas</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {targets.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma meta cadastrada.
            </Text>
          ) : (
            targets.map((item) => (
              <TargetCard
                key={item.id}
                title={item.title}
                percentage={Math.round(getTargetPercentage(item.id))}
                currentValue={formatCurrency(getTargetBalance(item.id))}
                targetValue={formatCurrency(item.targetAmount)}
                onPress={() => router.navigate(`/in-progress/${item.id}`)}
              />
            ))
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}