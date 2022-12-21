import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Loading } from '.'

describe('<Loading />', () => {
  it('should render the loading', () => {
    render(<Loading />)

    const sut = screen.getByTestId('loading-component')

    expect(sut).toBeInTheDocument()
  })

  it('should render loading in the center of the screen', () => {
    render(<Loading position="center" />)

    const sut = screen.getByTestId('loading-component')

    expect(sut).toHaveStyleRule('align-items', 'center')
    expect(sut).toHaveStyleRule('justify-content', 'center')
  })
})
