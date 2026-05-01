import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useState } from 'react'
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  View,
} from 'react-native'

import { Button } from '@/components/Button'
import { CurrencyInput } from '@/components/CurrencyInput'
import { Input } from '@/components/Input'
import { colors } from '@/theme'

import { styles } from './target.styles'

const targets = {
  '1': {
    id: '1',
    title: 'Apple Watch',
    targetValue: 1790,
  },
  '2': {
    id: '2',
    title: 'Comprar uma cadeira ergonômica',
    targetValue: 1200,
  },
  '3': {
    id: '3',
    title: 'Fazer uma viagem para o Rio de Janeiro',
    targetValue: 3000,
  },
}

export default function Target() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const isEditing = !!id
  const target = id ? targets[id as keyof typeof targets] : null

  const [title, setTitle] = useState(target?.title ?? '')
  const [targetValue, setTargetValue] = useState<number | null>(
    target?.targetValue ?? 0,
  )

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Meta', 'Informe o nome da meta.')
      return
    }

    if (!targetValue || targetValue <= 0) {
      Alert.alert('Meta', 'Informe um valor maior que zero.')
      return
    }

    Alert.alert(
      'Meta',
      isEditing ? 'Meta atualizada com sucesso.' : 'Meta criada com sucesso.',
      [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ],
    )
  }

  function handleDelete() {
    Alert.alert(
      'Excluir meta',
      'Deseja realmente excluir esta meta?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => router.replace('/'),
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

        {isEditing && (
          <Pressable onPress={handleDelete} hitSlop={8}>
            <MaterialIcons name="delete-outline" size={24} color={colors.red[500]} />
          </Pressable>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>
          {isEditing ? 'Editar meta' : 'Nova meta'}
        </Text>

        <Text style={styles.subtitle}>
          Defina o nome da sua meta e o valor que deseja alcançar.
        </Text>

        <View style={styles.form}>
          <Input
            label="Nome da meta"
            placeholder="Ex: Apple Watch"
            placeholderTextColor={colors.gray[500]}
            value={title}
            onChangeText={setTitle}
          />

          <CurrencyInput
            label="Valor alvo"
            value={targetValue}
            onChangeValue={setTargetValue}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button title={isEditing ? 'Salvar alterações' : 'Criar meta'} onPress={handleSave} />
      </View>
    </KeyboardAvoidingView>
  )
}