import { useEffect, useRef } from 'react'

export const useMounted = (function_, dependencies) => {
  const mountedRef = useRef(undefined)
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      return
    }
    function_()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])
}
