import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { StarknetProvider } from '@starknet-react/core'
import { FixedGlobalStyle, ThemedGlobalStyle } from '~/theme'
import Header from '~/components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StarknetProvider>
      <NextHead>
        <title>SNS</title>
      </NextHead>
      <FixedGlobalStyle />
      <ThemedGlobalStyle />
      <Header />
      <Component {...pageProps} />
    </StarknetProvider>
  )
}

export default MyApp
