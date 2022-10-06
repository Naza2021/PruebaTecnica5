import { newOrderSocket } from '@Utils/webSocketUtils'
import { useEffect, useRef } from 'react'

export const useOrderWebSocket = (identifier, onMessage, disableInitAtMount) => {
  const socketRef = useRef()

  const initOrderWebsocket = async () => {
    try {
      const orderWebSocket = await newOrderSocket(identifier, onMessage)
      socketRef.current = orderWebSocket
      return orderWebSocket
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    Boolean(disableInitAtMount) === false && initOrderWebsocket()
    return () => socketRef.current?.close?.()
  }, [])

  return { initOrderWebsocket, socketRef }
}
