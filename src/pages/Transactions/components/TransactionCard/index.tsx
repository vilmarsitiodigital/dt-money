import { dateFormatter, priceFormatter } from '../../../../utils/formatter'
import { Transaction } from '../../../../@types/Transaction'
import * as S from './styles'

interface TransactionCardPropsType {
  data: Transaction
}

export function TransactionCard({ data }: TransactionCardPropsType) {
  const { category, createdAt, description, price, type } = data

  return (
    <S.TransactionCardContainer data-testid="transaction-card-component">
      <td width="50%">{description}</td>
      <td>
        <S.PriceHighlight variant={type}>
          {type === 'outcome' && '- '}
          {priceFormatter.format(price)}
        </S.PriceHighlight>
      </td>
      <td>{category}</td>
      <td>{dateFormatter.format(new Date(createdAt))}</td>
    </S.TransactionCardContainer>
  )
}
