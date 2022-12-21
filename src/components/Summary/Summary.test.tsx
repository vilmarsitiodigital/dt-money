import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Summary } from '.'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { Transaction } from '../../@types/Transaction'

describe('<Summary />', () => {
  it('should render the summary', () => {
    const fakeTransactions: Transaction[] = [
      {
        id: 1,
        description: 'Desenvolvimento de site',
        type: 'income',
        category: 'Venda',
        price: 14000,
        createdAt: '2022-12-02T01:38:44.660Z',
      },
      {
        id: 2,
        description: 'Hamburguer',
        type: 'outcome',
        category: 'Alimentação',
        price: 50,
        createdAt: '2022-12-02T01:30:44.660Z',
      },
    ]

    const fakeContextProviderValues = {
      transactions: [],
      transactionsCount: 0,
      currentMonthTransactions: fakeTransactions,
      filters: {
        page: 1,
        limitPerPage: 1,
        initialDate: new Date(),
        finalDate: new Date(),
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
      <TransactionsContext.Provider value={fakeContextProviderValues}>
        <Summary />
      </TransactionsContext.Provider>,
    )

    const incomeText = screen.getByText('Entradas')
    const incomeValue = screen.getByText('R$ 14.000,00')

    const outcomeText = screen.getByText('Saídas')
    const outcomeValue = screen.getByText('R$ 50,00')

    const totalText = screen.getByText('Total')
    const totalValue = screen.getByText('R$ 13.950,00')

    expect(incomeText).toBeInTheDocument()
    expect(incomeValue).toBeInTheDocument()

    expect(outcomeText).toBeInTheDocument()
    expect(outcomeValue).toBeInTheDocument()

    expect(totalText).toBeInTheDocument()
    expect(totalValue).toBeInTheDocument()
  })
})
