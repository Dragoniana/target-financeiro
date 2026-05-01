# Target Financeiro

Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de metas financeiras.

O app permite criar metas, acompanhar o progresso de cada objetivo, registrar valores guardados e resgatados, além de visualizar um resumo geral com entradas, saídas e saldo disponível.

## Funcionalidades

- Cadastro de metas financeiras
- Edição de metas cadastradas
- Exclusão de metas
- Listagem de metas na tela inicial
- Visualização do progresso de cada meta
- Cálculo automático da porcentagem de progresso
- Cadastro de transações por meta
- Registro de valores guardados
- Registro de valores resgatados
- Bloqueio de resgate maior que o saldo disponível da meta
- Exclusão de transações
- Resumo geral com total disponível, entradas e saídas
- Persistência local dos dados com AsyncStorage

## Tecnologias utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Expo Linear Gradient
- Expo Google Fonts
- React Native Currency Input
- Expo Vector Icons

## Armazenamento dos dados

Os dados do aplicativo são salvos localmente no dispositivo usando AsyncStorage.

Isso significa que as metas e transações permanecem salvas mesmo após fechar e abrir o app novamente no mesmo dispositivo.

## Regras de negócio
O saldo de uma meta é calculado pelas entradas menos as saídas.
O progresso da meta é calculado com base no saldo atual e no valor alvo.
A porcentagem de progresso não ultrapassa 100%.
Não é permitido resgatar um valor maior do que o saldo disponível da meta.
Ao excluir uma meta, suas transações também são removidas.

## Dependências principais

Caso seja necessário instalar manualmente as dependências usadas no projeto, execute:

npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
npx expo install expo-font @expo-google-fonts/inter
npx expo install expo-linear-gradient
npx expo install @expo/vector-icons
npx expo install @react-native-async-storage/async-storage
npm install react-native-currency-input

## Estrutura do projeto

src/
  app/
    _layout.tsx
    index.tsx
    target.tsx
    in-progress/
      [id].tsx
    transaction/
      [id].tsx

  components/
    Button/
    CurrencyInput/
    HomeHeader/
    Input/
    Loading/
    Progress/
    TargetCard/
    TransactionCard/
    TransactionType/

  contexts/
    TargetsContext.tsx

  styles/
    home.styles.ts
    target.styles.ts
    inProgress.styles.ts
    transaction.styles.ts

  theme/
    colors.ts
    fontFamily.ts
    index.ts

  utils/
    formatCurrency.ts
    TransactionTypes.ts


## Como executar o projeto

Clone o repositório:

```bash
git clone https://github.com/Dragoniana/target-financeiro.git

- cd target-financeiro
- npm install
- npx expo start --clear



