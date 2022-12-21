import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer, HeaderContent, NewTransactionButton } from './styles'

import logoImg from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'
import { useState } from 'react'

export function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false)

  function handleCloseModal() {
    setIsModalVisible(false)
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />

        <Dialog.Root open={isModalVisible} onOpenChange={setIsModalVisible}>
          <Dialog.Trigger asChild>
            <NewTransactionButton>Nova transação</NewTransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal onClose={handleCloseModal} />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
