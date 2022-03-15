import { useStarknet } from '@starknet-react/core'
import { useEffect } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{ error?: boolean }>`
  box-shadow: none;
  padding: 5px 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error }) => (error ? 'rgb(255, 7, 58)' : 'white')};
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
  cursor: pointer;
`

export function ConnectWalletButton() {
  const { account, connectBrowserWallet, hasStarknet, error } = useStarknet()

  useEffect(() => {
    setTimeout(() => {
      connectBrowserWallet()
    }, 200)
  }, [connectBrowserWallet, hasStarknet])

  useEffect(() => {
    if (window.starknet) {
      window.starknet.on('accountsChanged', connectBrowserWallet)
    }
  }, [connectBrowserWallet])

  if (account) {
    const shortenedAddress = `${account.substring(0, 6)}...${account.substring(59)}`
    return <StyledButton>{shortenedAddress}</StyledButton>
  }

  if (error) {
    const argentXUrl =
      'https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb'

    const downloadArgentX = () => window.open(argentXUrl, '_blank')
    return (
      <StyledButton error={!!error} onClick={downloadArgentX}>
        Download ArgentX Wallet
      </StyledButton>
    )
  }

  return <StyledButton onClick={connectBrowserWallet}>Connect Wallet</StyledButton>
}
