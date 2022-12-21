import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DateFilterButton } from '.'

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

describe('<DateFilterButton />', () => {
  const initialDate = new Date(2022, 11, 13)

  beforeEach(() => {
    vi.setSystemTime(new Date())
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should render the date filter button', () => {
    render(
      <DateFilterButton currentDate={initialDate} onSelectDate={() => {}} />,
    )

    const buttonElement = screen.getByRole('button', { name: /Dezembro 2022/i })

    expect(buttonElement).toBeInTheDocument()
  })

  it('should selected new date filter for the previous year', async () => {
    const user = userEvent.setup()

    const onSelectDateSpy = vi.fn()

    render(
      <DateFilterButton
        currentDate={initialDate}
        onSelectDate={onSelectDateSpy}
      />,
    )

    const buttonElement = screen.getByRole('button', { name: /Dezembro 2022/i })

    await user.click(buttonElement)

    const prevYearButton = screen.getByTestId('previous-year-button')
    await user.click(prevYearButton)

    const newDateButton = screen.getByRole('button', { name: /fev/i })

    await user.click(newDateButton)

    expect(onSelectDateSpy).toHaveBeenCalledWith(new Date(2021, 1, 1))
    expect(
      screen.queryByRole('button', { name: /fev/i }),
    ).not.toBeInTheDocument()
  })

  it('should selected new date filter for the next year', async () => {
    const user = userEvent.setup()

    const onSelectDateSpy = vi.fn()

    render(
      <DateFilterButton
        currentDate={initialDate}
        onSelectDate={onSelectDateSpy}
      />,
    )

    const buttonElement = screen.getByRole('button', { name: /Dezembro 2022/i })

    await user.click(buttonElement)

    const prevYearButton = screen.getByTestId('next-year-button')
    await user.click(prevYearButton)

    const newDateButton = screen.getByRole('button', { name: /jun/i })

    await user.click(newDateButton)

    expect(onSelectDateSpy).toHaveBeenCalledWith(new Date(2023, 5, 1))
    expect(
      screen.queryByRole('button', { name: /jun/i }),
    ).not.toBeInTheDocument()
  })
})
