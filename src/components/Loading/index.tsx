import { LoadingContainer, LoadingIndicator } from './styles'

interface LoadingPropsType {
  position?: 'left' | 'center'
}

export function Loading({ position = 'left' }: LoadingPropsType) {
  return (
    <LoadingContainer data-testid="loading-component" position={position}>
      <LoadingIndicator />
    </LoadingContainer>
  )
}
