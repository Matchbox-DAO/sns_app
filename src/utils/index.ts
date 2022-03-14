import { BigNumber } from 'bignumber.js'

export function string_to_felt_bn(str: string) {
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
