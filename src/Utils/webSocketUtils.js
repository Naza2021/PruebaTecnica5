export const newOrderSocket = (identifier, onMessage) => {
  return new Promise((resolve, reject) => {
    const orderSocket = new WebSocket(`wss://payments.smsdata.com/ws/${identifier}`)
    orderSocket.addEventListener('message', (event) => {
      const eventData = JSON.parse(event.data)
      onMessage(eventData)
    })
    orderSocket.onopen = (event) => {
      resolve(orderSocket)
    }
    orderSocket.onerror = (event) => {
      reject('Conection failed')
    }
  })
}
