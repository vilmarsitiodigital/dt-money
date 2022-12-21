import styled from 'styled-components'

export const Loading = styled.span`
  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  display: block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.white};
  border-right-color: transparent;
  animation: rotate 1s infinite linear;
`
