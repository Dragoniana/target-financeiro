import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import { Alert, KeyboardAvoidingView, Platform, Pressable, Text, View } from 'react-native'

import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { TransactionType } from '@/components/TransactionType'
import { colors } from '@/theme'
import { TransactionTypes } from '@/utils/TransactionTypes'

import { styles } from './styles'

export default function Transaction() {
  const { id } = useLocalSearchParams<{ id: string }>()

  const [type, setType] = useState(TransactionTypes.Input)
  const [value, setValue] = useState<number | null>(0)
  const [description, setDescription] = useState('')

  function handleSave() {
    if (!value || value <= 0) {
      Alert.alert('Nova transação', 'Informe um valor maior que zero.')
      return
    }

    Alert.alert(
      'Nova transação',
      `Transação salva na meta ${id}.`,
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ],
    )
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={8}>
          <MaterialIcons name="arrow-back" size={28} color={colors.black} />
        </Pressable>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Nova transação</Text>

        <Text style={styles.subtitle}>
          Informe se deseja guardar ou resgatar dinheiro desta meta.
        </Text>

        <View style={styles.form}>
          <TransactionType selected={type} onChange={setType} />

          <CurrencyInput
            label="Valor"
            value={value}
            onChangeValue={setValue}
          />

          <Input
            label="Descrição"
            placeholder="Ex: CDB de 110% no banco XPTO"
            placeholderTextColor={colors.gray[500]}
            value={description}
            onChangeText={setDescription}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title="Salvar" onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  )
}