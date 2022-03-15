interface IStarknetWindowObject {
  request: (call: RpcMessage) => Promise<void>
  enable: (options?: { showModal?: boolean }) => Promise<string[]>
  isPreauthorized: () => Promise<boolean>
  on: (event: 'accountsChanged', handleEvent: EventHandler) => void
  off: (event: 'accountsChanged', handleEvent: EventHandler) => void
  account?: import('starknet').AccountInterface
  provider: import('starknet').Provider
  selectedAddress?: string
  version: string
}

interface ConnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: true
  account: import('starknet').AccountInterface
  selectedAddress: string
}

interface DisconnectedStarknetWindowObject extends IStarknetWindowObject {
  isConnected: false
}

export type StarknetWindowObject = ConnectedStarknetWindowObject | DisconnectedStarknetWindowObject

declare global {
  interface Window {
    starknet?: StarknetWindowObject
  }
}
