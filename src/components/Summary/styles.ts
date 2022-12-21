import styled, { css } from 'styled-components'

export const SummaryContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 2rem;

  margin-top: 2.5rem;

  overflow-x: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }

  p {
    display: none;
    font-size: 0.875rem;
    color: ${(props) => props.theme['gray-500']};
    margin-top: 0.125rem;
  }

  ${(props) =>
    props.variant === 'green' &&
    css`
      background: ${props.theme['green-700']};

      p {
        color: ${(props) => props.theme['gray-300']};
      }
    `}

  @media (max-width: 768px) {
    p {
      display: block;
    }
  }

  @media (max-width: 375px) {
    p {
      display: block;
    }
  }
`
