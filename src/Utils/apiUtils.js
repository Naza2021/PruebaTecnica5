const apiMethod = async (url, method, body) => {
  const StringifyBody = body ? { body: JSON.stringify(body) } : {}
  try {
    const response = await fetch('https://payments.smsdata.com/api/v1' + url, {
      method,
      ...{ ...StringifyBody },
      headers: {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        'X-Device-Id': 'fc9f8d58-d76e-4dc6-a195-5ebb7296a271',
        // 'X-Merchant-Id': '6facd535-1c98-4ccd-8e25-b6c115bf2da1',
      },
    })

    if (!response.ok) {
      throw new Error(response.status)
    }

    const jsonResponse = await response.json()

    return jsonResponse
  } catch (e) {
    console.error({ e })
    return { sucess: false, reason: `Server error: ${e.message}` }
  }
}

/**@return {Promise<Array<GenericCurrency>>} */
export const getCurrencys = () => apiMethod('/currencies', 'GET')

/**@return {Promise<CreateOrderResponse>} */
export const createOrder = (expected_output_amount, input_currency, reference) =>
  apiMethod('/orders/', 'POST', {
    expected_output_amount,
    input_currency,
    reference,
  })

/**@return {Promise<Array<OrderInfo>>} */
export const getOrder = (identifier) => apiMethod(`/orders/info/${identifier}`, 'GET')
