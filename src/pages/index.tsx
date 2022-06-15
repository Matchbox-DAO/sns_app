import {
  useStarknet,
  useStarknetCall,
  useStarknetInvoke,
  useStarknetTransactionManager,
  Transaction,
} from '@starknet-react/core'
import { BigNumber } from 'bignumber.js'
import type { NextPage } from 'next'
import { ConnectWallet } from '~/components/ConnectWallet'
import { useSNSContract } from '~/hooks/sns'
import { TransactionList } from '~/components/TransactionList'
import { useForm } from 'react-hook-form'

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
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
      invokeSnsRegister({ args: [{ name: data_dec_str }] })
      console.log('invoked sns_register() with ', data_dec_str)
    }
  }

  return (
    <div>
      <h3>StarkNet Wallet</h3>
      <ConnectWallet />

      <h3>Starknet Name Service / SNS</h3>
      <p>Contract address (testnet): {snsContract?.connectedTo}</p>

      {/* <ShowNameLookup /> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        {/* include validation with required or other standard HTML validation rules */}
        {/* errors will return when field validation fails  */}

        <input defaultValue="name to register" {...register('nameRequired', { required: true })} />
        {errors.nameRequired && <span> (This field is required) </span>}

        <input type="submit" />
      </form>

      <div>
        <p>[tx status] Submitting: {loading ? 'Submitting' : 'Not Submitting'}</p>
        <p>[tx status] Error: {error || 'No error'}</p>
      </div>

      <DemoTransactionManager />
    </div>
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
