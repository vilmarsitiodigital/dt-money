import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TransactionCardLoading } from '.'

describe('<TransactionCardLoading />', () => {
  it('should render transaction card loading', () => {
    const tbodyElement = document.createElement('tbody')

    const { container } = render(<TransactionCardLoading />, {
      container: document.body.appendChild(tbodyElement),
    })

    expect(container).toBeTruthy()
  })
})
