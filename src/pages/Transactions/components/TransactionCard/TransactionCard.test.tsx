import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { TransactionCard } from '.'
import { Transaction } from '../../../../@types/Transaction'

describe('<TransactionCard />', () => {
  it('should render outcome transaction card', () => {
    const fakeData: Transaction = {
      id: 1,
      category: 'Alimentação',
      createdAt: '2022-12-13T23:28:54.666Z',
      description: 'Cachorro quente',
      price: 24,
      type: 'outcome',
    }

    const tbodyElement = document.createElement('tbody')
    render(<TransactionCard data={fakeData} />, {
      container: document.body.appendChild(tbodyElement),
    })

    const descriptionText = screen.getByText(fakeData.description)
    const priceText = screen.getByText('- R$ 24,00')
    const categoryText = screen.getByText(fakeData.category)
    const dateText = screen.getByText('13/12/2022')

    expect(descriptionText).toBeInTheDocument()
    expect(priceText).toBeInTheDocument()
    expect(categoryText).toBeInTheDocument()
    expect(dateText).toBeInTheDocument()
  })

  it('should render income transaction card', () => {
    const fakeData: Transaction = {
      id: 1,
      category: 'Investimentos',
      createdAt: '2022-11-13T23:28:54.666Z',
      description: 'Dividendos',
      price: 240,
      type: 'income',
    }

    const tbodyElement = document.createElement('tbody')
    render(<TransactionCard data={fakeData} />, {
      container: document.body.appendChild(tbodyElement),
    })

    const descriptionText = screen.getByText(fakeData.description)
    const priceText = screen.getByText('R$ 240,00')
    const categoryText = screen.getByText(fakeData.category)
    const dateText = screen.getByText('13/11/2022')

    expect(descriptionText).toBeInTheDocument()
    expect(priceText).toBeInTheDocument()
    expect(categoryText).toBeInTheDocument()
    expect(dateText).toBeInTheDocument()
  })
})
