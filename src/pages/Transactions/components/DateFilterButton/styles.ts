import styled from 'styled-components'
import * as Popover from '@radix-ui/react-popover'

export const Trigger = styled(Popover.Trigger)`
  background: transparent;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme['gray-100']};
  border: 0;
  font-size: 1.5rem;
  cursor: pointer;
  text-transform: capitalize;

  svg {
    color: ${({ theme }) => theme['green-500']};
  }

  &:hover {
    color: ${({ theme }) => theme['gray-300']};
    transition: color 0.2s;

    svg {
      color: ${({ theme }) => theme['green-700']};
      transition: color 0.2s;
    }
  }
`

export const OptionsContainer = styled(Popover.Content)`
  background: ${({ theme }) => theme['gray-800']};
  border: 1px solid ${({ theme }) => theme['green-300']};
  padding: 1.25rem 1.875rem;
  border-radius: 6px;
`

interface ButtonPropsType {
  isActive: boolean
}

export const Button = styled.button<ButtonPropsType>`
  border: 0;
  padding: 8px;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ theme, isActive }) =>
    isActive ? theme['green-500'] : theme['gray-700']};
  color: ${({ theme }) => theme['gray-300']};
  display: grid;
  place-items: center;
  font-size: 12px;
  font-weight: bold;

  &:hover {
    background: ${({ theme }) => theme['gray-600']};
    transition: background-color 0.2s;
  }
`

export const OptionsCloseButton = styled(Popover.Close)`
  display: grid;
  place-items: center;
  margin-left: auto;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme['gray-500']};
`

export const OptionsHeader = styled.header`
  display: flex;
  align-items: stretch;
  justify-content: space-between;

  span {
    color: ${({ theme }) => theme['gray-300']};
    display: grid;
    place-items: center;
  }
`

export const ArrowButton = styled.button`
  display: grid;
  place-items: center;
  border: 0;
  background: transparent;
  cursor: pointer;
  width: 1.875rem;
  height: 1.875rem;
  color: ${({ theme }) => theme['green-700']};

  &:hover {
    color: ${({ theme }) => theme['green-500']};
    transition: color 0.2s;
  }
`

export const Options = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
`

export const ArrowIndicator = styled(Popover.Arrow)`
  fill: ${({ theme }) => theme['green-300']};
`
