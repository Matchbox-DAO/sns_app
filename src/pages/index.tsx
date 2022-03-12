import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction,
} from '@starknet-react/core'
import { BigNumber } from 'bignumber.js'
import type { NextPage } from 'next'
import { useSNSContract } from '~/hooks/sns'
import { TransactionList } from '~/components/TransactionList'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const HomeWrapper = styled.div`
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const StyledForm = styled.form`
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

  &:disabled {
    background: rgb(199, 211, 227);
  }
`

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })
  const { account } = useStarknet()
  const { contract: snsContract } = useSNSContract()
  // const { invoke: invokeSnsRegister } = useStarknetInvoke({ contract: snsContract, method: 'sns_register' })
  const {
    data,
    loading,
    error,
    reset,
    invoke: invokeSnsRegister,
  } = useStarknetInvoke({
    contract: snsContract,
    method: 'sns_register',
  })

  const onSubmit = (data: any) => {
    if (!account) {
      console.log('user wallet not connected yet.')
    } else if (!snsContract) {
      console.log('frontend not connected to SNS contract')
    } else {
      let data_dec_str = string_to_felt_bn(data['nameRequired']).toString()
      invokeSnsRegister({ args: [data_dec_str] })
      console.log('invoked sns_register() with ', data_dec_str)
    }
  }

  return (
    <HomeWrapper>
      <div style={{ margin: '0px auto', minWidth: '60%' }}>
        {/* <h3>Argent X Wallet</h3> */}
        {/* <ConnectWallet /> */}

        <SNSTitleContainer>
          <SNSTitlePrimary>SNS</SNSTitlePrimary>
          <div>Starknet Name Service </div>
        </SNSTitleContainer>
        {/* <p>Contract address (testnet): {snsContract?.connectedTo}</p> */}

        {/* <ShowNameLookup /> */}

        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          {/* include validation with required or other standard HTML validation rules */}
          {/* errors will return when field validation fails  */}

          <NameInput placeholder="Search Names" {...register('name', { required: true })} />
          {/* {errors.nameRequired && <span> (This field is required) </span>} */}

          <SearchButton disabled={!account || !isValid} type="submit">
            Search
          </SearchButton>
        </StyledForm>

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

function string_to_felt_bn(str: string) {
  BigNumber.config({ EXPONENTIAL_AT: 76 })

  let array = str.split('').map(function (c: string) {
    return c.charCodeAt(0)
  })
  let felt_bn = new BigNumber(0)

  for (const e of array) {
    felt_bn = felt_bn.multipliedBy(256)
    felt_bn = felt_bn.plus(e)
  }
  return felt_bn
}

export default Home
