import { BigNumber } from '@ethersproject/bignumber'
import { formatEther } from '@ethersproject/units'
import Wei, { wei } from '@synthetixio/wei'
import { ethers } from 'ethers'

export default function fromWei(number: BigNumber): number {
  return parseFloat(formatEther(number.toString()))
}

export const weiFromWei = (weiAmount: WeiSource) => {
  if (weiAmount instanceof Wei) {
    const precisionDiff = 18 - weiAmount.p
    return wei(weiAmount, 18, true).div(10 ** precisionDiff)
  } else {
    return wei(weiAmount, 18, true)
  }
}

type WeiSource = Wei | number | string | ethers.BigNumber
