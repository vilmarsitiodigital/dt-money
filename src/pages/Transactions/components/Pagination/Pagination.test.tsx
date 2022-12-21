import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Pagination } from '.'
import userEvent from '@testing-library/user-event'

describe('<Pagination />', () => {
  it('should not render pagination when has only one page', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={1}
        totalItemsPerPage={2}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const sut = screen.queryByTestId('pagination-component')

    expect(sut).not.toBeInTheDocument()
  })

  it('should render pagination when the amount of items is greater than the limit of items per page', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={2}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const sut = screen.getByTestId('pagination-component')

    expect(sut).toBeInTheDocument()
  })

  it('should go to next page when click next button', async () => {
    const onNextPageSpy = vi.fn()

    const user = userEvent.setup()
    render(
      <Pagination
        currentPage={1}
        totalItems={2}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={onNextPageSpy}
        onSetPage={() => {}}
      />,
    )

    const buttons = screen.getAllByRole('button')
    const nextButton = buttons[buttons.length - 1]

    await user.click(nextButton)

    expect(onNextPageSpy).toHaveBeenCalled()
  })

  it('should go to previous page when click in the previous button', async () => {
    const onPrevPageSpy = vi.fn()

    const user = userEvent.setup()
    render(
      <Pagination
        currentPage={2}
        totalItems={2}
        totalItemsPerPage={1}
        onPrevPage={onPrevPageSpy}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const buttons = screen.getAllByRole('button')
    const prevButton = buttons[0]

    await user.click(prevButton)

    expect(onPrevPageSpy).toHaveBeenCalled()
  })

  it('should go to a specific page when click in the page button', async () => {
    const onSetPageSpy = vi.fn()

    const user = userEvent.setup()
    render(
      <Pagination
        currentPage={1}
        totalItems={4}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={onSetPageSpy}
      />,
    )

    const buttons = screen.getAllByRole('button')
    const pageTwoButton = buttons[2]

    await user.click(pageTwoButton)

    expect(onSetPageSpy).toHaveBeenCalledWith(2)
  })

  it('should render 5 page buttons if it has more than 5 pages', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const buttons = screen.getAllByRole('button')
    const pageButtons = buttons.slice(1, -1)

    expect(pageButtons).toHaveLength(5)
  })

  it('should render 4 page buttons after current page when current page is 1', () => {
    render(
      <Pagination
        currentPage={1}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const pageTwoButton = screen.getByRole('button', { name: '2' })
    const pageThreeButton = screen.getByRole('button', { name: '3' })
    const pageFourButton = screen.getByRole('button', { name: '4' })
    const pageFiveButton = screen.getByRole('button', { name: '5' })

    expect(pageTwoButton).toBeInTheDocument()
    expect(pageThreeButton).toBeInTheDocument()
    expect(pageFourButton).toBeInTheDocument()
    expect(pageFiveButton).toBeInTheDocument()
  })

  it('should render 1 page button before current page and 3 page buttons after current page when current page is 2', () => {
    render(
      <Pagination
        currentPage={2}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const pageOneButton = screen.getByRole('button', { name: '1' })
    const pageThreeButton = screen.getByRole('button', { name: '3' })
    const pageFourButton = screen.getByRole('button', { name: '4' })
    const pageFiveButton = screen.getByRole('button', { name: '5' })

    expect(pageOneButton).toBeInTheDocument()
    expect(pageThreeButton).toBeInTheDocument()
    expect(pageFourButton).toBeInTheDocument()
    expect(pageFiveButton).toBeInTheDocument()
  })

  it('should render 2 page buttons before and after current page when it has more than 5 pages and current page is greater than or equal to 3 or less than or equal to total pages - 2', () => {
    render(
      <Pagination
        currentPage={5}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const pageThreeButton = screen.getByRole('button', { name: '3' })
    const pageFourButton = screen.getByRole('button', { name: '4' })
    const pageSixButton = screen.getByRole('button', { name: '6' })
    const pageSevenButton = screen.getByRole('button', { name: '7' })

    expect(pageThreeButton).toBeInTheDocument()
    expect(pageFourButton).toBeInTheDocument()
    expect(pageSixButton).toBeInTheDocument()
    expect(pageSevenButton).toBeInTheDocument()
  })

  it('should render 4 page buttons before current page when current page is last page', () => {
    render(
      <Pagination
        currentPage={10}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const pageSixButton = screen.getByRole('button', { name: '6' })
    const pageSevenButton = screen.getByRole('button', { name: '7' })
    const pageEightButton = screen.getByRole('button', { name: '8' })
    const pageNinButton = screen.getByRole('button', { name: '9' })

    expect(pageSixButton).toBeInTheDocument()
    expect(pageSevenButton).toBeInTheDocument()
    expect(pageEightButton).toBeInTheDocument()
    expect(pageNinButton).toBeInTheDocument()
  })

  it('should render 1 page button after current page and 3 page buttons before current page when current page is penultimate page', () => {
    render(
      <Pagination
        currentPage={9}
        totalItems={10}
        totalItemsPerPage={1}
        onPrevPage={() => {}}
        onNextPage={() => {}}
        onSetPage={() => {}}
      />,
    )

    const pageSixButton = screen.getByRole('button', { name: '6' })
    const pageSevenButton = screen.getByRole('button', { name: '7' })
    const pageEightButton = screen.getByRole('button', { name: '8' })
    const pageTenButton = screen.getByRole('button', { name: '10' })

    expect(pageSixButton).toBeInTheDocument()
    expect(pageSevenButton).toBeInTheDocument()
    expect(pageEightButton).toBeInTheDocument()
    expect(pageTenButton).toBeInTheDocument()
  })
})
