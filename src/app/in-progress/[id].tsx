import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Pressable, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { Progress } from '@/components/Progress'
import { TransactionCard } from '@/components/TransactionCard'
import { colors } from '@/theme'

import { styles } from './styles'

const targets = {
  '1': {
    id: '1',
    title: 'Apple Watch',
    currentValue: 'R$ 580,00',
    targetValue: 'R$ 1.790,00',
    percentage: 25,
  },
  '2': {
    id: '2',
    title: 'Comprar uma cadeira ergonômica',
    currentValue: 'R$ 800,00',
    targetValue: 'R$ 1.200,00',
    percentage: 75,
  },
  '3': {
    id: '3',
    title: 'Fazer uma viagem para o Rio de Janeiro',
    currentValue: 'R$ 1.100,00',
    targetValue: 'R$ 3.000,00',
    percentage: 75,
  },
}

const transactions = [
  {
    id: '1',
    type: 'output' as const,
    value: 'R$ 20,00',
    date: '12/04/25',
    description: '',
  },
  {
    id: '2',
    type: 'input' as const,
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'CDB de 110% no banco XPTO',
  },
  {
    id: '3',
    type: 'input' as const,
    value: 'R$ 300,00',
    date: '12/04/25',
    description: 'CDB de 110% no banco XPTO',
  },
]

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const target = targets[id as keyof typeof targets] ?? targets['1']

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={28} color={colors.black} />
        </Pressable>

        <Pressable
          onPress={() =>
            router.navigate({
              pathname: '/target',
              params: { id: target.id },
            })
          }
          hitSlop={8}
        >
          <MaterialIcons name="edit" size={22} color={colors.gray[600]} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{target.title}</Text>

        <View style={styles.progressInfo}>
          <View>
            <Text style={styles.label}>Valor guardado</Text>

            <Text style={styles.values}>
              {target.currentValue}{' '}
              <Text style={styles.targetValue}>de {target.targetValue}</Text>
            </Text>
          </View>

          <Text style={styles.percentage}>{target.percentage}%</Text>
        </View>

        <Progress percentage={target.percentage} />

        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Transações</Text>
        </View>

        <View style={styles.transactionsList}>
          {transactions.map((item) => (
            <TransactionCard
              key={item.id}
              type={item.type}
              value={item.value}
              date={item.date}
              description={item.description}
              onRemove={() => {}}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Nova transação"
          onPress={() => router.navigate(`/transaction/${target.id}`)}
        />
      </View>
    </View>
  )
}