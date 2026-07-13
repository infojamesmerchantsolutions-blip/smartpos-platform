export const swaggerOptions = {
  openapi: {
    openapi: '3.0.3',
    info: {
      title: 'SmartPOS Platform API',
      description: 'REST API for the SmartPOS payment platform.',
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ],
    tags: [
      { name: 'Health' },
      { name: 'Authentication' },
      { name: 'Merchants' },
      { name: 'Users' },
      { name: 'Terminals' },
      { name: 'Transactions' },
      { name: 'Wallets' },
      { name: 'Settlements' },
      { name: 'KYC' },
      { name: 'Webhooks' }
    ]
  }
};
