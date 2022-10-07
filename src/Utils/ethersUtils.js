import { ethers, utils } from 'ethers'
import { abi as BEP20Abi } from '@Utils/BEP20ABI.json'

/**@returns {string | undefined} */
const symbolToAddress = (symbol) => {
  return {
    USDT_T2: '0x110a13FC3efE6A245B50102D2d79B3E76125Ae83',
  }?.[symbol]
}

/**@param {'USDT_T2' | undefined} CoinSymbol*/
export const transferCoin = async (CoinSymbol, valueToTransfer, ReceiverWallet) => {
  await window.ethereum.request({ method: 'eth_requestAccounts' })
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const usdtContract = symbolToAddress(CoinSymbol) && new ethers.Contract(symbolToAddress(CoinSymbol), BEP20Abi, signer)

  try {
    const { hash } =
      usdtContract === undefined
        ? await signer.sendTransaction({ to: ReceiverWallet, value: utils.parseUnits(valueToTransfer.toString(), 18) })
        : await usdtContract.transfer(ReceiverWallet, utils.parseUnits(valueToTransfer.toString(), 18))
    await provider.waitForTransaction(hash)
    return { success: true }
  } catch (e) {
    if (e.code === -32603) {
      return { success: false, reason: 'Balance insuficiente' }
    }
    return { success: false, reason: e }
  }
}
