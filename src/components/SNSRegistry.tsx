import { LookupData, LookupState } from '~/pages'
import styled from 'styled-components'
import Loader from './Loader'
import { useSNSContract } from '~/hooks/sns'
import { useStarknetInvoke } from '@starknet-react/core'
import { string_to_felt_bn } from '~/utils'

const RegistryContainer = styled.div`
  padding: 70px 0px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 400;
`

const RegistryCard = styled.div<{ exist: boolean }>`
  position: relative;
  background-color: white;
  border-radius: 6px;
  box-shadow: rgb(144 171 191 / 42%) 3px 4px 20px 0px;
  padding: 0px;
  width: 100%;

  ::before {
    content: '';
    background: ${({ exist }) => (exist ? 'rgb(66, 224, 104)' : ' rgb(255, 7, 58)')};
    width: 4px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 10;
  }
`

const RegistryCardInner = styled.div`
  padding: 22px;
  padding-right: 12px;
  overflow: hidden;
  position: relative;
  background: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: auto;
  /* grid-template-columns: 1fr; */
  /* gap: 10px; */
  -webkit-box-align: center;
  align-items: center;
  font-size: 24px;
  transition: all 0.2s ease 0s;
  border-radius: 6px;
  color: rgb(43, 43, 43);
  z-index: 1;
`

const RegisterButton = styled.button`
  background-color: #44318d;
  color: white;
  font-size: 16px;
  font-weight: 300;
  padding: 12px 18px;
  border-radius: 10px;
  outline: none;
  border: none;
  cursor: pointer;

  &:disabled {
    background: rgb(199, 211, 227);
    cursor: auto;
    padding: 15px 12px;
  }
`

export default function SNSRegistry({ lookupName, lookupData, lookupLoading, lookupError }: LookupState) {
  //   console.log('🚀 ~ file: SNSRegistry.tsx ~ line 60 ~ SNSRegistry ~ lookupName', lookupName)

  // const
  console.log('🚀 ~ file: SNSRegistry.tsx ~ line 17 ~ SNSRegistry ~ lookupData', lookupData)

  const { contract: snsContract } = useSNSContract()

  const {
    data: registerHash,
    loading: registerLoading,
    error: registerError,
    reset: registerReset,
    invoke: invokeRegister,
  } = useStarknetInvoke({
    contract: snsContract,
    method: 'sns_register',
  })

  const onRegister = (data: any) => {
    if (!lookupName) return
    if (!snsContract) {
      console.log('frontend not connected to SNS contract')
    } else {
      let data_dec_str = string_to_felt_bn(lookupName).toString()
      invokeRegister({ args: [data_dec_str] })
      console.log('invoked sns_register() with ', data_dec_str)
    }
  }

  return (
    <RegistryContainer>
      {lookupLoading ? (
        <Loader size="30px" />
      ) : lookupError ? (
        <div> {lookupError}</div>
      ) : lookupData ? (
        lookupData.exist && lookupData.adr === '0' ? (
          <RegistryCard exist={true}>
            <RegistryCardInner>
              {lookupName}
              {!registerLoading ? (
                <RegisterButton onClick={onRegister}>Register</RegisterButton>
              ) : (
                <div style={{ padding: '0px 18px' }}>
                  <Loader size="20px" stroke="#44318d" />
                </div>
              )}
            </RegistryCardInner>
          </RegistryCard>
        ) : (
          <RegistryCard exist={false}>
            <RegistryCardInner>
              {lookupName}
              <RegisterButton disabled>Unavailable</RegisterButton>
            </RegistryCardInner>
          </RegistryCard>
        )
      ) : null}
    </RegistryContainer>
  )
}
