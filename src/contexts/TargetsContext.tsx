import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { Loading } from '@/components/Loading'
import { TransactionTypes } from '@/utils/TransactionTypes'

const STORAGE_KEY = '@target-financeiro:data'

export type FinancialTarget = {
  id: string
  title: string
  targetAmount: number
  createdAt: string
}

export type FinancialTransaction = {
  id: string
  targetId: string
  type: TransactionTypes
  amount: number
  description: string
  createdAt: string
}

type StoredData = {
  targets: FinancialTarget[]
  transactions: FinancialTransaction[]
}

type TargetsContextData = {
  targets: FinancialTarget[]
  transactions: FinancialTransaction[]
  createTarget: (title: string, targetAmount: number) => FinancialTarget
  updateTarget: (id: string, title: string, targetAmount: number) => void
  deleteTarget: (id: string) => void
  createTransaction: (
    targetId: string,
    type: TransactionTypes,
    amount: number,
    description: string,
  ) => void
  deleteTransaction: (id: string) => void
  getTargetBalance: (targetId: string) => number
  getTargetPercentage: (targetId: string) => number
  getTargetTransactions: (targetId: string) => FinancialTransaction[]
  getTotalInput: () => number
  getTotalOutput: () => number
  getTotalBalance: () => number
}

const TargetsContext = createContext({} as TargetsContextData)

const initialTargets: FinancialTarget[] = [
  {
    id: '1',
    title: 'Apple Watch',
    targetAmount: 1790,
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '2',
    title: 'Comprar uma cadeira ergonômica',
    targetAmount: 1200,
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '3',
    title: 'Fazer uma viagem para o Rio de Janeiro',
    targetAmount: 3000,
    createdAt: '2025-04-12T12:00:00.000Z',
  },
]

const initialTransactions: FinancialTransaction[] = [
  {
    id: '1',
    targetId: '1',
    type: TransactionTypes.Output,
    amount: 20,
    description: '',
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '2',
    targetId: '1',
    type: TransactionTypes.Input,
    amount: 300,
    description: 'CDB de 110% no banco XPTO',
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '3',
    targetId: '1',
    type: TransactionTypes.Input,
    amount: 300,
    description: 'CDB de 110% no banco XPTO',
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '4',
    targetId: '2',
    type: TransactionTypes.Input,
    amount: 800,
    description: 'Primeiro depósito',
    createdAt: '2025-04-12T12:00:00.000Z',
  },
  {
    id: '5',
    targetId: '3',
    type: TransactionTypes.Input,
    amount: 1100,
    description: 'Reserva inicial',
    createdAt: '2025-04-12T12:00:00.000Z',
  },
]

type Props = {
  children: ReactNode
}

export function TargetsProvider({ children }: Props) {
  const [targets, setTargets] = useState<FinancialTarget[]>([])
  const [transactions, setTransactions] = useState<FinancialTransaction[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY)

        if (stored) {
          const parsed: StoredData = JSON.parse(stored)

          setTargets(Array.isArray(parsed.targets) ? parsed.targets : [])
          setTransactions(
            Array.isArray(parsed.transactions) ? parsed.transactions : [],
          )
        } else {
          setTargets(initialTargets)
          setTransactions(initialTransactions)
        }
      } catch {
        setTargets(initialTargets)
        setTransactions(initialTransactions)
      } finally {
        setIsLoaded(true)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    async function saveData() {
      if (!isLoaded) {
        return
      }

      const data: StoredData = {
        targets,
        transactions,
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }

    saveData()
  }, [targets, transactions, isLoaded])

  function createTarget(title: string, targetAmount: number) {
    const newTarget: FinancialTarget = {
      id: String(Date.now()),
      title,
      targetAmount,
      createdAt: new Date().toISOString(),
    }

    setTargets((state) => [...state, newTarget])

    return newTarget
  }

  function updateTarget(id: string, title: string, targetAmount: number) {
    setTargets((state) =>
      state.map((item) =>
        item.id === id
          ? {
              ...item,
              title,
              targetAmount,
            }
          : item,
      ),
    )
  }

  function deleteTarget(id: string) {
    setTargets((state) => state.filter((item) => item.id !== id))
    setTransactions((state) => state.filter((item) => item.targetId !== id))
  }

  function createTransaction(
    targetId: string,
    type: TransactionTypes,
    amount: number,
    description: string,
  ) {
    const newTransaction: FinancialTransaction = {
      id: String(Date.now()),
      targetId,
      type,
      amount,
      description,
      createdAt: new Date().toISOString(),
    }

    setTransactions((state) => [newTransaction, ...state])
  }

  function deleteTransaction(id: string) {
    setTransactions((state) => state.filter((item) => item.id !== id))
  }

  function getTargetTransactions(targetId: string) {
    return transactions.filter((item) => item.targetId === targetId)
  }

  function getTargetBalance(targetId: string) {
    return getTargetTransactions(targetId).reduce((total, item) => {
      if (item.type === TransactionTypes.Input) {
        return total + item.amount
      }

      return total - item.amount
    }, 0)
  }

  function getTargetPercentage(targetId: string) {
    const target = targets.find((item) => item.id === targetId)

    if (!target || target.targetAmount <= 0) {
      return 0
    }

    const balance = getTargetBalance(targetId)
    const percentage = (balance / target.targetAmount) * 100

    return Math.max(0, Math.min(percentage, 100))
  }

  function getTotalInput() {
    return transactions.reduce((total, item) => {
      if (item.type === TransactionTypes.Input) {
        return total + item.amount
      }

      return total
    }, 0)
  }

  function getTotalOutput() {
    return transactions.reduce((total, item) => {
      if (item.type === TransactionTypes.Output) {
        return total + item.amount
      }

      return total
    }, 0)
  }

  function getTotalBalance() {
    return getTotalInput() - getTotalOutput()
  }

  const value = useMemo(
    () => ({
      targets,
      transactions,
      createTarget,
      updateTarget,
      deleteTarget,
      createTransaction,
      deleteTransaction,
      getTargetBalance,
      getTargetPercentage,
      getTargetTransactions,
      getTotalInput,
      getTotalOutput,
      getTotalBalance,
    }),
    [targets, transactions],
  )

  if (!isLoaded) {
    return <Loading />
  }

  return (
    <TargetsContext.Provider value={value}>
      {children}
    </TargetsContext.Provider>
  )
}

export function useTargets() {
  return useContext(TargetsContext)
}