import { useState } from 'react'

const useSimpleLoading = (numbersLoads, defaultState) => {
  const [loadState, setLoadState] = useState(numbersLoads ? new Array(numbersLoads).fill(Boolean(defaultState)) : Boolean(defaultState))

  /**
   * @template T
   * @param {T} PromiseData
   * @param {Number} index
   * @return {T}
   */
  const setLoading = async (PromiseData, index) => {
    setLoadState((prevState) => (numbersLoads ? Object.assign([], prevState, { [index]: true }) : true))
    const Response = await PromiseData
    setLoadState((prevState) => (numbersLoads ? Object.assign([], prevState, { [index]: false }) : false))
    return Response
  }

  const delayFunc = (num) => {
    return new Promise((resolve) => setTimeout(resolve, num))
  }

  return { loadState, setLoading, delayFunc }
}

export default useSimpleLoading
