/**
 * @typedef {Object} QrData
 * @prop {Array<string>} QrOptions
 * @prop {Object.<string, Array<string | {text, copy}>>} QrInformations
 * @prop {Array<{_svg}>} QrGenerated
 */

/**
 * @typedef {Object} GenericCurrency
 * @prop {string} blockchain
 * @prop {string} image
 * @prop {string} max_amount
 * @prop {string} min_amount
 * @prop {string} name
 * @prop {string} symbol
 */

/**
 * @typedef {Object} OrderInfo
 * @prop {number} id
 * @prop {string} identifier
 * @prop {Date} created_at
 * @prop {Date} edited_at
 * @prop {Date} expired_time
 * @prop {string} status
 * @prop {number} fiat_amount
 * @prop {number} international_fiat
 * @prop {string} fiat
 * @prop {number} crypto_amount
 * @prop {number} amount_to_send
 * @prop {string} currency_id
 * @prop {string} network_name
 * @prop {any} chain_id
 * @prop {string} network_image
 * @prop {string} merchant_device
 * @prop {any} notes
 * @prop {string} address
 * @prop {string} title_tag_memo
 * @prop {string} tag_memo
 * @prop {string} payment_uri
 * @prop {number} fee_amount
 * @prop {number} fee_percentage
 * @prop {number} net_amount
 * @prop {any} url_ok
 * @prop {any} url_ko
 * @prop {string} url_img
 * @prop {boolean} need_dni
 * @prop {boolean} safe
 * @prop {string | null} reference
 */

/**
 * Add this type in top of your file, or if commonly used in some types file.
 * @template T
 * @typedef {[T, import('react').Dispatch<import('react').SetStateAction<T>>]} useState
 */

/**
 * @typedef {Object} payContext
 * @prop {float} FiatAmount
 * @prop {string} Concept
 * @prop {string} Commerce
 * @prop {Date} CreateDate
 * @prop {Array<GenericCurrency>} Currencys
 * @prop {GenericCurrency} CurrencySelected
 * @prop {OrderInfo} OrderInfo
 * @prop {QrData} QrData
 * @prop {'PE' | 'CO' | 'EX' | 'AC'} PaymentStatus
 * - PE: Pending
 * - CO: Completed
 * - EX: Expired
 * - AC: Waiting for confirmation
 * @prop {{text, info}} Error
 */

/**
 * @typedef {Object} CreateOrderResponse
 * @prop {string} payment_uri
 * @prop {string} identifier
 * @prop {string} web_url
 * @prop {string} address
 * @prop {string} tag_memo
 * @prop {string} input_currency
 * @prop {number} expected_input_amount
 * @prop {number} rate
 * @prop {any} notes
 * @prop {any} reference
 * @prop {string} fiat
 * @prop {string} language
 */
