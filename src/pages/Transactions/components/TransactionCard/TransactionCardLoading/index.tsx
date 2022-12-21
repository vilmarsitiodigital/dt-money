import { Loading } from '../../../../../components/Loading'
import * as SBase from '../styles'

export function TransactionCardLoading() {
  return (
    <SBase.TransactionCardContainer data-testid="transaction-card-loading-component">
      <td width="50%">
        <Loading />
      </td>
      <td>
        <Loading />
      </td>
      <td>
        <Loading />
      </td>
      <td>
        <Loading />
      </td>
    </SBase.TransactionCardContainer>
  )
}
