import { router } from 'expo-router'
import { Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { HomeHeader } from '@/components/HomeHeader'
import { TargetCard } from '@/components/TargetCard'

import { styles } from './styles'

const targets = [
  {
    id: '1',
    title: 'Apple Watch',
    percentage: 50,
    currentValue: 'R$ 580,00',
    targetValue: 'R$ 1.790,00',
  },
  {
    id: '2',
    title: 'Comprar uma cadeira ergonômica',
    percentage: 75,
    currentValue: 'R$ 800,00',
    targetValue: 'R$ 1.200,00',
  },
  {
    id: '3',
    title: 'Fazer uma viagem para o Rio de Janeiro',
    percentage: 75,
    currentValue: 'R$ 1.100,00',
    targetValue: 'R$ 3.000,00',
  },
]

export default function Home() {
  return (
    <View style={styles.container}>
      <HomeHeader />

      <View style={styles.content}>
        <Text style={styles.title}>Metas</Text>

        <View style={styles.list}>
          {targets.map((item) => (
            <TargetCard
              key={item.id}
              title={item.title}
              percentage={item.percentage}
              currentValue={item.currentValue}
              targetValue={item.targetValue}
              onPress={() => router.navigate(`/in-progress/${item.id}`)}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Nova meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  )
}