import { MaterialIcons } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
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
import { useTargets } from '@/contexts/TargetsContext'
import { colors } from '@/theme'

import { styles } from '../styles/target.styles'

export default function Target() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const {
    targets,
    createTarget,
    updateTarget,
    deleteTarget,
  } = useTargets()

  const isEditing = !!id
  const target = id ? targets.find((item) => item.id === id) : undefined

  const [title, setTitle] = useState('')
  const [targetValue, setTargetValue] = useState<number | null>(0)

  useEffect(() => {
    if (target) {
      setTitle(target.title)
      setTargetValue(target.targetAmount)
    }
  }, [target])

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Meta', 'Informe o nome da meta.')
      return
    }

    if (!targetValue || targetValue <= 0) {
      Alert.alert('Meta', 'Informe um valor maior que zero.')
      return
    }

    if (isEditing && target) {
      updateTarget(target.id, title.trim(), targetValue)
      router.back()
      return
    }

    const newTarget = createTarget(title.trim(), targetValue)

    router.replace(`/in-progress/${newTarget.id}`)
  }

  function handleDelete() {
    if (!target) {
      return
    }

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
          onPress: () => {
            deleteTarget(target.id)
            router.replace('/')
          },
        },
      ],
    )
  }

  if (isEditing && !target) {
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
        <Button
          title={isEditing ? 'Salvar alterações' : 'Criar meta'}
          onPress={handleSave}
        />
      </View>
    </KeyboardAvoidingView>
  )
}