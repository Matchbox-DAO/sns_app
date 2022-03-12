import { useStarknet } from '@starknet-react/core'
import styled from 'styled-components'

const StyledButton = styled.button`
  box-shadow: none;
  padding: 5px 20px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(255, 255, 255);
  border-radius: 6px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease 0s;
  color: white;
  font-size: 20px;
  font-weight: 300;
`

export function ConnectWalletButton() {
  const { account, connectBrowserWallet } = useStarknet()

  if (account) {
    const shortenedAddress = `${account.substring(0, 6)}...${account.substring(59)}`
    return <StyledButton>{shortenedAddress}</StyledButton>
  }

  return <StyledButton onClick={connectBrowserWallet}>Connect Wallet</StyledButton>
}
