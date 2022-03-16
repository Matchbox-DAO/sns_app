import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction,
  // UseStarknetCall,
} from '@starknet-react/core'
import type { NextPage } from 'next'
import { useSNSContract } from '~/hooks/sns'
import { TransactionList } from '~/components/TransactionList'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { useState } from 'react'
import SNSRegistry from '~/components/SNSRegistry'
import { isValidDiscordUsername, string_to_felt_bn } from '~/utils'
import { Solve2MintRedirect } from '~/components/Solve2MintRedirect'

const HomeWrapper = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  padding-top: 150px;
  position: relative;
  /* justify-content: center;
  align-items: center; */
`

const SNSTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  text-transform: uppercase;
  font-weight: 500;
  color: white;
  margin-bottom: 60px;
`

const SNSTitlePrimary = styled.div`
  font-size: 60px;
  font-weight: 700;
`

const NameInput = styled.input`
  border-radius: 6px 0px 0px 6px;
  font-size: 28px;
  width: 100%;
  border: none;
  padding: 20px 0px 20px 55px;
  display: block;

  ::placeholder {
    color: #dae5ef;
    font-weight: 300;
  }

  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const StyledInputSection = styled.div`
  /* min-width: 780px; */
  display: flex;
  position: relative;
  color: grey;

  ::before {
    content: '';
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translate(0px, -50%);
    display: block;
    width: 30px;
    height: 30px;
    background: url('/images/search.svg') no-repeat;
  }
`

const SearchButton = styled.button`
  border-radius: 0px 6px 6px 0px;
  display: block;
  background: rgb(82, 132, 255);
  color: white;
  font-size: 22px;
  font-family: Overpass;
  padding: 20px 0px;
  height: 90px;
  width: 162px;
  border: none;
  cursor: pointer;

  &:disabled {
    background: rgb(199, 211, 227);
  }
`

const DiscordUsernameError = styled.div`
  /* margin-top: 15px; */
  color: red;
  font-size: 18px;
  padding: 15px 10px;
`

const Solve2MintSubtitle = styled.div`
  color: rgb(120, 120, 120);
  font-weight: 500;
  font-size: 15px;
  padding-top: 5px;
`

export interface LookupData {
  exist: boolean
  adr?: string
}

export interface LookupState {
  lookupName?: string
  lookupData?: LookupData
  lookupLoading: boolean
  lookupError?: any
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm({ mode: 'onChange' })
  const { account } = useStarknet()
  const { contract: snsContract } = useSNSContract()
  const [{ lookupName, lookupData, lookupLoading, lookupError }, setSNSLookupState] = useState<LookupState>({
    lookupName: undefined,
    lookupData: undefined,
    lookupLoading: false,
    lookupError: undefined,
  })

  const [discordUsernameError, setDiscordUsernameError] = useState(false)

  const onSearch = (name: string | undefined) => {
    if (!name || !snsContract) {
      return
    }

    if (!isValidDiscordUsername(name)) {
      setDiscordUsernameError(true)

      if (lookupName) {
        setSNSLookupState({ lookupName: name, lookupData: undefined, lookupLoading: false, lookupError })
      }
      return
    }

    setDiscordUsernameError(false)

    let data_dec_str = string_to_felt_bn(name).toString()

    setSNSLookupState({ lookupName: name, lookupData, lookupLoading: true, lookupError })
    snsContract
      .sns_lookup_name_to_adr(data_dec_str)
      .then((data) => {
        console.log('🚀 ~ file: index.tsx ~ line 159 ~ .then ~ data', data)
        setSNSLookupState({
          lookupName: name,
          lookupData: { exist: Boolean(data.exist.toString()), adr: data.adr.toString() },
          lookupLoading: false,
          lookupError: undefined,
        })
      })
      .catch((err) => {
        setSNSLookupState({ lookupName: name, lookupData: undefined, lookupLoading: false, lookupError: err })
      })
  }

  const onSubmit = () => {
    setSNSLookupState({ lookupName: undefined, lookupData: undefined, lookupLoading: false, lookupError: undefined })
    reset()
  }

  return (
    <HomeWrapper>
      <div style={{ margin: '0px auto', minWidth: '60%' }}>
        {/* <h3>Argent X Wallet</h3> */}
        {/* <ConnectWallet /> */}

        <SNSTitleContainer>
          <SNSTitlePrimary>SNS</SNSTitlePrimary>
          <div>Starknet Name Service </div>
          <Solve2MintSubtitle>( For Solve2Mint )</Solve2MintSubtitle>
        </SNSTitleContainer>
        {/* <p>Contract address (testnet): {snsContract?.connectedTo}</p> */}

        {/* <ShowNameLookup /> */}

        <form onSubmit={handleSubmit((inputData) => onSearch(inputData['name']))}>
          {/* register your input into the hook by invoking the "register" function */}
          {/* include validation with required or other standard HTML validation rules */}
          {/* errors will return when field validation fails  */}

          <StyledInputSection>
            <NameInput placeholder="Enter your Discord username" {...register('name', { required: true })} />

            <SearchButton disabled={!account || !isValid} type="submit">
              Search
            </SearchButton>
          </StyledInputSection>

          {discordUsernameError && (
            <DiscordUsernameError> Please use a valid discord username (eg: guiltygyoza#0357) </DiscordUsernameError>
          )}
        </form>

        <SNSRegistry
          lookupName={lookupName}
          lookupLoading={lookupLoading}
          lookupData={lookupData}
          lookupError={lookupError}
          onSubmit={onSubmit}
        />

        {/* <div>
          <p>[tx status] Submitting: {loading ? 'Submitting' : 'Not Submitting'}</p>
          <p>[tx status] Error: {error || 'No error'}</p>
        </div> */}

        {/* <DemoTransactionManager /> */}
      </div>
    </HomeWrapper>
  )
}

function DemoTransactionManager() {
  const { transactions, removeTransaction } = useStarknetTransactionManager()
  return (
    <div>
      <h3>Transaction Manager</h3>
      <div>
        {transactions.length === 0
          ? 'No transactions'
          : transactions.map((tx, index) => (
              <TransactionItem key={index} transaction={tx} onClick={() => removeTransaction(tx.transactionHash)} />
            ))}
      </div>
    </div>
  )
}

function TransactionItem({ transaction, onClick }: { transaction: Transaction; onClick: () => void }) {
  return (
    <div>
      {transaction.status}: {transaction.transactionHash} <button onClick={onClick}>remove</button>
    </div>
  )
}

export default Home
