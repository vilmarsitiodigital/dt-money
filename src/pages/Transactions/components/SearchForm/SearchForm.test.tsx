import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SearchForm } from '.'
import userEvent from '@testing-library/user-event'

describe('<SearchForm />', () => {
  it('should render search form', () => {
    render(<SearchForm onSearch={() => {}} />)

    const buttonElement = screen.getByRole('button', { name: /Buscar/i })
    const inputElement = screen.getByPlaceholderText('Busque por transações')

    expect(buttonElement).toBeInTheDocument()
    expect(inputElement).toBeInTheDocument()
  })

  it('should called onSearch function when click in the submit button', async () => {
    const onSearchSpy = vi.fn()

    const user = userEvent.setup()

    render(<SearchForm onSearch={onSearchSpy} />)

    const inputElement = screen.getByPlaceholderText('Busque por transações')

    await user.type(inputElement, 'teste')

    const buttonElement = screen.getByRole('button', { name: /Buscar/i })

    await user.click(buttonElement)

    expect(onSearchSpy).toHaveBeenCalledWith('teste')
  })
})
