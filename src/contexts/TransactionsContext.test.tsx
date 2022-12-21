import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useContextSelector } from 'use-context-selector'
import { describe, it, vi } from 'vitest'
import { Transaction } from '../@types/Transaction'
import { api } from '../lib/axios'
import {
  TransactionsContext,
  TransactionsProvider,
} from './TransactionsContext'

vi.mock('../lib/axios', () => ({
  api: {
    get: () => ({
      data: [],
      headers: {
        'x-total-count': 0,
      },
    }),
    post: vi.fn(() => ({ data: [] })),
  },
}))

describe('Transactions Context', () => {
  it('should render empty transactions and 0 transactionsCount', async () => {
    const Consumer = () => {
      const dataContext = useContextSelector(
        TransactionsContext,
        (context) => ({
          transactions: context.transactions,
          transactionsCount: context.transactionsCount,
        }),
      )

      return (
        <>
          <span>
            Transactions list - {JSON.stringify(dataContext.transactions)}
          </span>
          <span>Transactions count - {dataContext.transactionsCount}</span>
        </>
      )
    }

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const transactionsList = screen.getByText(/Transactions list - /i)
    const transactionsCount = screen.getByText(/Transactions count - /i)

    await waitFor(() =>
      expect(transactionsList).toHaveTextContent('Transactions list - []'),
    )
    await waitFor(() =>
      expect(transactionsCount).toHaveTextContent('Transactions count - 0'),
    )
  })

  it('should render initial filters', async () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2022, 11, 2))

    const Consumer = () => {
      const { filters } = useContextSelector(
        TransactionsContext,
        (context) => ({
          filters: context.filters,
        }),
      )

      return (
        <>
          <span>Filter page - {filters.page}</span>
          <span>Filter limit per page - {filters.limitPerPage}</span>
          <span>Filter initial date - {filters.initialDate.toISOString()}</span>
          <span>Filter final date - {filters.finalDate.toISOString()}</span>
        </>
      )
    }

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const page = screen.getByText(/Filter page -/i)
    const limitPerPage = screen.getByText(/Filter limit per page -/i)
    const initialDate = screen.getByText(/Filter initial date -/i)
    const finalDate = screen.getByText(/Filter final date -/i)

    expect(page).toHaveTextContent('Filter page - 1')
    expect(limitPerPage).toHaveTextContent('Filter limit per page - 7')
    expect(initialDate).toHaveTextContent(
      'Filter initial date - 2022-12-01T03:00:00.000Z',
    )
    await waitFor(() => {
      expect(finalDate).toHaveTextContent(
        'Filter final date - 2022-12-31T03:00:00.000Z',
      )
    })

    vi.useRealTimers()
  })

  it('should go to next and previous page', async () => {
    const user = userEvent.setup()

    const Consumer = () => {
      const { filters, nextPage, prevPage } = useContextSelector(
        TransactionsContext,
        (context) => ({
          filters: context.filters,
          nextPage: context.nextPage,
          prevPage: context.prevPage,
        }),
      )

      return (
        <>
          <button type="button" onClick={prevPage}>
            Prev page
          </button>
          <span>Filter page - {filters.page}</span>
          <button type="button" onClick={nextPage}>
            Next page
          </button>
        </>
      )
    }

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const page = screen.getByText(/Filter page -/i)
    expect(page).toHaveTextContent('Filter page - 1')

    const nextPageButton = screen.getByRole('button', { name: /next page/i })
    await user.click(nextPageButton)

    expect(page).toHaveTextContent('Filter page - 2')

    const prevPageButton = screen.getByRole('button', { name: /prev page/i })
    await user.click(prevPageButton)

    expect(page).toHaveTextContent('Filter page - 1')
  })

  it('should select page', async () => {
    const user = userEvent.setup()

    const pageSelect = 7

    const Consumer = () => {
      const { filters, selectPage } = useContextSelector(
        TransactionsContext,
        (context) => ({
          filters: context.filters,
          selectPage: context.selectPage,
        }),
      )

      return (
        <>
          <span>Filter page - {filters.page}</span>
          <button type="button" onClick={() => selectPage(pageSelect)}>
            Select page {pageSelect}
          </button>
        </>
      )
    }

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const page = screen.getByText(/Filter page -/i)
    expect(page).toHaveTextContent('Filter page - 1')

    const selectPageButton = screen.getByRole('button', {
      name: /Select page/i,
    })
    await user.click(selectPageButton)

    expect(page).toHaveTextContent(`Filter page - ${pageSelect}`)
  })

  it('should change initial and final filter date', async () => {
    const todayDate = new Date()
    const newDate = new Date(2022, 0, 1)

    vi.setSystemTime(todayDate)

    const Consumer = () => {
      const { filters, selectNewDate } = useContextSelector(
        TransactionsContext,
        (context) => ({
          filters: context.filters,
          selectNewDate: context.selectNewDate,
        }),
      )

      return (
        <>
          <span>Filter initial date - {filters.initialDate.toISOString()}</span>
          <span>Filter final date - {filters.finalDate.toISOString()}</span>
          <button type="button" onClick={() => selectNewDate(newDate)}>
            JAN 2022
          </button>
        </>
      )
    }

    const user = userEvent.setup()

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const initialFilterDateElement = screen.getByText(/Filter initial date -/i)
    const firstDayOfCurrentMonthInISO = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth(),
      1,
    ).toISOString()
    expect(initialFilterDateElement).toHaveTextContent(
      `Filter initial date - ${firstDayOfCurrentMonthInISO}`,
    )

    const finalFilterDateElement = screen.getByText(/Filter final date -/i)
    const lastDayOfCurrentMonthInISO = new Date(
      todayDate.getFullYear(),
      todayDate.getMonth() + 1,
      0,
    ).toISOString()
    expect(finalFilterDateElement).toHaveTextContent(
      `Filter final date - ${lastDayOfCurrentMonthInISO}`,
    )

    const newDateButtonElement = screen.getByRole('button', {
      name: /JAN 2022/i,
    })
    await user.click(newDateButtonElement)

    expect(initialFilterDateElement).toHaveTextContent(
      `Filter initial date - ${newDate.toISOString()}`,
    )
    const lastDayOfMonthOfNewDateInISO = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0,
    ).toISOString()
    expect(finalFilterDateElement).toHaveTextContent(
      `Filter final date - ${lastDayOfMonthOfNewDateInISO}`,
    )

    vi.useRealTimers()
  })

  it('should create new transaction', async () => {
    vi.setSystemTime(new Date())

    const fakeNewTransaction = {
      category: 'Alimentação',
      description: 'Jantar',
      price: 49,
      type: 'outcome' as Transaction['type'],
      createdAt: new Date(),
    }

    const Consumer = () => {
      const { transactions, createTransaction } = useContextSelector(
        TransactionsContext,
        (context) => ({
          transactions: context.transactions,
          createTransaction: context.createTransaction,
        }),
      )

      return (
        <>
          <span>Transactions List - {JSON.stringify(transactions)}</span>
          <button
            type="button"
            onClick={() => createTransaction(fakeNewTransaction)}
          >
            create new category
          </button>
        </>
      )
    }

    const user = userEvent.setup()

    render(
      <TransactionsProvider>
        <Consumer />
      </TransactionsProvider>,
    )

    const transactionsElement = screen.getByText(/Transactions List/i)
    expect(transactionsElement).toHaveTextContent('Transactions List - []')

    const newTransactionButtonElement = screen.getByRole('button', {
      name: /create new category/i,
    })
    await user.click(newTransactionButtonElement)

    expect(api.post).toHaveBeenCalledWith('/transactions', fakeNewTransaction)

    vi.useRealTimers()
  })
})
