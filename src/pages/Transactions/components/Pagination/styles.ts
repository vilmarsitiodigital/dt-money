import styled from 'styled-components'

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
  margin-top: 2.5rem;

  button {
    display: grid;
    place-items: center;
    cursor: pointer;
    border: 0;
  }

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

export const PaginationNavigateButton = styled.button`
  color: ${({ theme }) => theme['green-700']};
  background: transparent;

  &:disabled {
    color: ${({ theme }) => theme['gray-600']};
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    transition: color 0.2s;
    color: ${({ theme }) => theme['green-500']};
  }
`

interface PaginationPageButtonProps {
  isActive?: boolean
}

export const PaginationPageButton = styled.button<PaginationPageButtonProps>`
  width: 40px;
  height: 40px;
  background: ${({ theme, isActive }) =>
    isActive ? theme['green-700'] : theme['gray-600']};
  border-radius: 6px;
  font-weight: bold;
  color: ${({ theme }) => theme.white};

  &:hover {
    transition: background-color 0.2s;
    background: ${({ theme, isActive }) =>
      isActive ? theme['green-500'] : theme['gray-700']};
  }
`

export const PaginationSeparatePageButtons = styled.span`
  display: grid;
  place-items: center;
  font-weight: bold;
  color: ${({ theme }) => theme.white};
`
