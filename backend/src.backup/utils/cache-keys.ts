export const CacheKeys = {

  merchant: (

    id: string

  ) =>

    `merchant:${id}`,

  customer: (

    id: string

  ) =>

    `customer:${id}`,

  transaction: (

    id: string

  ) =>

    `transaction:${id}`,

  paymentIntent: (

    id: string

  ) =>

    `payment-intent:${id}`,

  exchangeRate: (

    from: string,

    to: string

  ) =>

    `exchange-rate:${from}:${to}`,

  wallet: (

    id: string

  ) =>

    `wallet:${id}`,

  settlement: (

    id: string

  ) =>

    `settlement:${id}`,

  webhook: (

    id: string

  ) =>

    `webhook:${id}`,

  providerHealth: (

    provider: string

  ) =>

    `provider-health:${provider}`

};
