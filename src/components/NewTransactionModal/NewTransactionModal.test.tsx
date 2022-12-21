import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewTransactionModal } from '.'
import * as Dialog from '@radix-ui/react-dialog'
import userEvent from '@testing-library/user-event'
import { TransactionsContext } from '../../contexts/TransactionsContext'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('<NewTransactionModal />', () => {
  it('should render the new transaction modal', async () => {
    const user = userEvent.setup()
    render(
      <Dialog.Root>
        <Dialog.Trigger />

        <NewTransactionModal onClose={() => {}} />
      </Dialog.Root>,
    )

    const triggerButton = screen.getByRole('button')
    await user.click(triggerButton)

    const sut = screen.getByText('Nova transação')

    expect(sut).toBeInTheDocument()
  })

  it('should called onClose property function', async () => {
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
      isLoadingTransactions: false,
      fetchTransactions: async () => {},
      createTransaction: async () => {},
      nextPage: () => {},
      prevPage: () => {},
      selectPage: () => {},
      selectNewDate: () => {},
    }

    const onCloseSpy = vi.fn()

    const user = userEvent.setup()

    render(
      <TransactionsContext.Provider value={fakeContextValues}>
        <Dialog.Root>
          <Dialog.Trigger />

          <NewTransactionModal onClose={onCloseSpy} />
        </Dialog.Root>
      </TransactionsContext.Provider>,
    )

    const triggerButton = screen.getByRole('button')
    await user.click(triggerButton)

    const descriptionInput = screen.getByPlaceholderText('Descrição')
    await user.type(descriptionInput, 'Nova descrição')

    const priceInput = screen.getByPlaceholderText('Preço')
    await user.type(priceInput, '1')

    const categoryInput = screen.getByPlaceholderText('Categoria')
    await user.type(categoryInput, 'Nova categoria')

    const incomeSelectButton = screen.getByText('Entrada')
    await user.click(incomeSelectButton)

    const submitButton = screen.getByRole('button', { name: /cadastrar/i })
    await user.click(submitButton)

    expect(onCloseSpy).toHaveBeenCalled()
  })
})
