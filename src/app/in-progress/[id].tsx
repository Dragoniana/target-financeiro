import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { Alert, Pressable, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { Progress } from '@/components/Progress'
import { TransactionCard } from '@/components/TransactionCard'
import { useTargets } from '@/contexts/TargetsContext'
import { colors } from '@/theme'
import { formatCurrency } from '@/utils/formatCurrency'

import { styles } from './styles'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(date))
}

export default function InProgress() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const {
    targets,
    getTargetBalance,
    getTargetPercentage,
    getTargetTransactions,
    deleteTransaction,
  } = useTargets()

  const target = targets.find((item) => item.id === id)

  function handleRemoveTransaction(transactionId: string) {
    Alert.alert(
      'Excluir transação',
      'Deseja realmente excluir esta transação?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteTransaction(transactionId),
        },
      ],
    )
  }

  if (!target) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} hitSlop={8}>
            <MaterialIcons name="arrow-back" size={28} color={colors.black} />
          </Pressable>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Meta não encontrada</Text>
        </View>
      </View>
    )
  }

  const balance = getTargetBalance(target.id)
  const percentage = getTargetPercentage(target.id)
  const transactions = getTargetTransactions(target.id)

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
              {formatCurrency(balance)}{' '}
              <Text style={styles.targetValue}>
                de {formatCurrency(target.targetAmount)}
              </Text>
            </Text>
          </View>

          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        </View>

        <Progress percentage={percentage} />

        <View style={styles.transactionsHeader}>
          <Text style={styles.transactionsTitle}>Transações</Text>
        </View>

        <View style={styles.transactionsList}>
          {transactions.length === 0 ? (
            <Text style={styles.emptyText}>
              Nenhuma transação cadastrada.
            </Text>
          ) : (
            transactions.map((item) => (
              <TransactionCard
                key={item.id}
                type={item.type}
                value={formatCurrency(item.amount)}
                date={formatDate(item.createdAt)}
                description={item.description}
                onRemove={() => handleRemoveTransaction(item.id)}
              />
            ))
          )}
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