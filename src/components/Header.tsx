import styled from 'styled-components'
import { ConnectWalletButton } from './ConnectWallet'
import { Solve2MintRedirect } from './Solve2MintRedirect'

const HeaderWrapper = styled.div`
  padding: 30px;
  position: relative;
`

export default function Header() {
  return (
    <HeaderWrapper>
      <Solve2MintRedirect />
      <ConnectWalletButton />
    </HeaderWrapper>
  )
}
