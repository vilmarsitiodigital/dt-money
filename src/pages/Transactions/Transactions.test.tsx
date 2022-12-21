import { describe, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Transactions } from '.'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Transaction } from '../../@types/Transaction'

describe('<Transaction />', () => {
  it('should not render pagination and render loading component when transaction page is loading data', () => {
    const fakeContextValues = {
      transactions: [],
      transactionsCount: 0,
      currentMonthTransactions: [],
      filters: {
        page: 1,
        limitPerPage: 1,
        initialDate: new Date(2022, 11, 1),
        finalDate: new Date(2022, 11, 31),
      },
      isCreateingNewTransaction: false,
      isLoadingTransactions: true,
      fetchTransactions: async () => {},
      createTransaction: async () => {},
      nextPage: () => {},
      prevPage: () => {},
      selectPage: () => {},
      selectNewDate: () => {},
    }

    render(
      <TransactionsContext.Provider value={fakeContextValues}>
        <Transactions />
      </TransactionsContext.Provider>,
    )

    const loadingComponent = screen.getByTestId('loading-component')
    const paginationComponent = screen.queryByTestId('pagination-component')
    const transactionCardComponent = screen.queryByTestId(
      'transaction-card-component',
    )
    const transactionCardLoadingComponent = screen.queryByTestId(
      'transaction-card-loading-component',
    )

    expect(loadingComponent).toBeInTheDocument()
    expect(paginationComponent).not.toBeInTheDocument()
    expect(transactionCardComponent).not.toBeInTheDocument()
    expect(transactionCardLoadingComponent).not.toBeInTheDocument()
  })

  it('should render transaction card loading when creating a new transaction', () => {
    const fakeContextValues = {
      transactions: [],
      transactionsCount: 0,
      currentMonthTransactions: [],
      filters: {
        page: 1,
        limitPerPage: 1,
        initialDate: new Date(2022, 11, 1),
        finalDate: new Date(2022, 11, 31),
      },
      isCreateingNewTransaction: true,
      isLoadingTransactions: false,
      fetchTransactions: async () => {},
      createTransaction: async () => {},
      nextPage: () => {},
      prevPage: () => {},
      selectPage: () => {},
      selectNewDate: () => {},
    }

    render(
      <TransactionsContext.Provider value={fakeContextValues}>
        <Transactions />
      </TransactionsContext.Provider>,
    )

    const transactionCardLoadingComponent = screen.getByTestId(
      'transaction-card-loading-component',
    )
    const tableBodyComponent = screen.getByRole('rowgroup').closest('tbody')

    expect(transactionCardLoadingComponent).toBeInTheDocument()
    expect(tableBodyComponent).toBeInTheDocument()
  })

  it('should render transaction card when have transactions', () => {
    const fakeTransactions: Transaction[] = [
      {
        id: 1,
        category: 'Alimentação',
        createdAt: '2022-12-14T01:03:27.840Z',
        description: 'Hamburguer',
        price: 25,
        type: 'outcome',
      },
    ]

    const fakeContextValues = {
      transactions: fakeTransactions,
      transactionsCount: fakeTransactions.length,
      currentMonthTransactions: fakeTransactions,
      filters: {
        page: 1,
        limitPerPage: 1,
        initialDate: new Date(2022, 11, 1),
        finalDate: new Date(2022, 11, 31),
      },
      isCreateingNewTransaction: false,
      isLoadingTransactions: false,
      fetchTransactions: async () => {},
      createTransaction: async () => {},
      nextPage: () => {},
      prevPage: () => {},
      selectPage: () => {},
      selectNewDate: () => {},
    }

    render(
      <TransactionsContext.Provider value={fakeContextValues}>
        <Transactions />
      </TransactionsContext.Provider>,
    )

    const sut = screen.getByText('Alimentação')

    expect(sut).toBeInTheDocument()
  })
})
