import { useState } from 'react'
import { CaretDown, CaretLeft, CaretRight, X } from 'phosphor-react'
import * as S from './styles'
import * as Popover from '@radix-ui/react-popover'

interface DateFilterButtonPropsType {
  currentDate: Date
  onSelectDate: (newDate: Date) => void
}

export function DateFilterButton({
  currentDate,
  onSelectDate,
}: DateFilterButtonPropsType) {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false)
  const [newYear, setNewYear] = useState(new Date().getFullYear())

  const currentYear = currentDate.getFullYear()
  const currentMonth = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  }).format(currentDate)

  const dates = [
    new Date(newYear, 0, 1),
    new Date(newYear, 1, 1),
    new Date(newYear, 2, 1),
    new Date(newYear, 3, 1),
    new Date(newYear, 4, 1),
    new Date(newYear, 5, 1),
    new Date(newYear, 6, 1),
    new Date(newYear, 7, 1),
    new Date(newYear, 8, 1),
    new Date(newYear, 9, 1),
    new Date(newYear, 10, 1),
    new Date(newYear, 11, 1),
  ]
  const dateSettings = new Intl.DateTimeFormat('pt-BR', { month: 'long' })

  function handleSelectMonth(newDate: Date) {
    onSelectDate(newDate)
    setIsOptionsOpen(false)
  }

  function nextYear() {
    setNewYear((prevState) => prevState + 1)
  }

  function prevYear() {
    setNewYear((prevState) => prevState - 1)
  }

  return (
    <Popover.Root open={isOptionsOpen} onOpenChange={setIsOptionsOpen}>
      <S.Trigger>
        {`${currentMonth} ${currentYear}`}
        <CaretDown weight="bold" size={24} />
      </S.Trigger>

      <Popover.Portal>
        <S.OptionsContainer align="start" sideOffset={8}>
          <S.OptionsCloseButton>
            <X weight="bold" />
          </S.OptionsCloseButton>

          <S.OptionsHeader>
            <S.ArrowButton
              type="button"
              onClick={prevYear}
              data-testid="previous-year-button"
            >
              <CaretLeft weight="bold" size={24} />
            </S.ArrowButton>

            <span>{newYear}</span>

            <S.ArrowButton
              type="button"
              onClick={nextYear}
              data-testid="next-year-button"
            >
              <CaretRight weight="bold" size={24} />
            </S.ArrowButton>
          </S.OptionsHeader>

          <S.Options>
            {dates.map((date) => (
              <S.Button
                type="button"
                key={date.toISOString()}
                onClick={() => handleSelectMonth(date)}
                isActive={currentDate.toISOString() === date.toISOString()}
              >
                {dateSettings.format(date).toUpperCase().slice(0, 3)}
              </S.Button>
            ))}
          </S.Options>

          <S.ArrowIndicator />
        </S.OptionsContainer>
      </Popover.Portal>
    </Popover.Root>
  )
}
