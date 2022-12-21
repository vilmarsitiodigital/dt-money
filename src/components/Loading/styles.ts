import styled, { css } from 'styled-components'

const loadingMapperPosition = {
  center: css`
    align-items: center;
    justify-content: center;
  `,
  left: css`
    align-items: flex-start;
    justify-content: flex-start;
  `,
}

interface LoadingCustomStylesType {
  position: keyof typeof loadingMapperPosition
}

export const LoadingContainer = styled.div<LoadingCustomStylesType>`
  display: flex;
  ${({ position }) => loadingMapperPosition[position]}
`

export const LoadingIndicator = styled.span`
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
