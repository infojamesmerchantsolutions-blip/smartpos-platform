import {
  Prisma,
  PaymentStatus,
  SettlementStatus,
  TransactionStatus
} from "@prisma/client";

import { FastifyInstance } from "fastify";

import PaymentService from "./payment.service.js";
import ExchangeService from "./exchange.service.js";
import GatewayService from "./gateway.service.js";
import SettlementService from "./settlement.service.js";
import BlockchainService from "./blockchain.service.js";
import { removeUndefinedFields } from "bullmq";

export default class TransactionService {

  private paymentService: PaymentService;

  private exchangeService: ExchangeService;

  private gatewayService: GatewayService;

  private settlementService: SettlementService;

  private blockchainService: BlockchainService;

  constructor(
    private readonly app: FastifyInstance
  ) {

    this.paymentService =
      new PaymentService(app);

    this.exchangeService =
      new ExchangeService(app);

    this.gatewayService =
      new GatewayService(app);

    this.settlementService =
      new SettlementService(app);

    this.blockchainService =
      new BlockchainService(app);

  }

  /*
  |--------------------------------------------------------------------------
  | Start Transaction
  |--------------------------------------------------------------------------
  */

  async startTransaction(data: {

    merchantId: string;

    terminalId?: string;

    customerId?: string;

    walletId?: string;

    paymentMethodId?: string;

    amount: Prisma.Decimal;

    currency: any;

    paymentMethod: string;

    type: string;

    description?: string;

    metadata?: Prisma.JsonValue;

  }) {

    return this.app.prisma.$transaction(

      async (tx) => {

        /*
        ----------------------------------------
        Verify Merchant
        ----------------------------------------
        */

        const merchant =
          await tx.merchant.findUnique({

            where: {

              id: data.merchantId

            }

          });

        if (!merchant) {

          throw new Error(
            "Merchant not found."
          );

        }

        /*
        ----------------------------------------
        Verify Terminal
        ----------------------------------------
        */

        if (data.terminalId) {

          const terminal =
            await tx.terminal.findUnique({

              where: {

                id: data.terminalId

              }

            });

          if (!terminal) {

            throw new Error(
              "Terminal not found."
            );

          }

        }

        /*
        ----------------------------------------
        Verify Customer
        ----------------------------------------
        */

        if (data.customerId) {

          const customer =
            await tx.customer.findUnique({

              where: {

                id: data.customerId

              }

            });

          if (!customer) {

            throw new Error(
              "Customer not found."
            );

          }

        }

        /*
        ----------------------------------------
        Create Payment Intent
        ----------------------------------------
        */

        const paymentIntent =
          await this.paymentService
            .createPaymentIntent({

              merchantId:
                data.merchantId,

              customerId:
                data.customerId,

              paymentMethodId:
                data.paymentMethodId,

              amount:
                data.amount,

              currency:
                data.currency,

              description:
                data.description,

              metadata:
                data.metadata

            });

        /*
        ----------------------------------------
        Create Transaction
        ----------------------------------------
        */

        const transaction =
          await this.paymentService
            .createTransaction({

              merchantId:
                data.merchantId,

              terminalId:
                data.terminalId,

              customerId:
                data.customerId,

              walletId:
                data.walletId,

              amount:
                data.amount,

              currency:
                data.currency,

              paymentMethod:
                data.paymentMethod,

              type:
                data.type,

              description:
                data.description,

              paymentIntentId:
                paymentIntent.id,

              metadata:
                data.metadata

            }) ;

        /*
        ----------------------------------------
        Create Payment Attempt
        ----------------------------------------
        */

        const paymentAttempt =
          await this.paymentService
            .createPaymentAttempt({

              paymentIntentId:
                paymentIntent.id,

              transactionId:
                transaction.id,

              amount:
                data.amount,

              currency:
                data.currency

            });

        return {

          paymentIntent,

          transaction,

          paymentAttempt

        };

      }

    );

  }

  /*
  |--------------------------------------------------------------------------
  | Load Transaction
  |--------------------------------------------------------------------------
  */

  async getTransaction(

    transactionId: string

  ) {

    return this.app.prisma.transaction.findUnique({

      where: {

        id: transactionId

      },

      include: {

        merchant: true,

        terminal: true,

        customer: true,

        wallet: true,

        paymentIntent: true,

        paymentAttempts: true,

        authorization: true,

        capture: true,

        reversal: true,

        voidTransaction: true,

        gatewayRequest: true,

        gatewayResponse: true,

        blockchainTransaction: true,

        cryptoConversion: true,

        refunds: true,

        events: true,

        timeline: true,

        statusHistory: true

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Execute Payment
  |--------------------------------------------------------------------------
  */

  async executePayment(data: {

    transactionId: string;

    providerId: string;

    endpoint: string;

    method: string;

    requestBody: Prisma.JsonValue;

    requestHeaders: Prisma.JsonValue;

    fromCurrency: any;

    toCurrency: any;

  }) {

    const transaction =
      await this.getTransaction(
        data.transactionId
      );

    if (!transaction) {

      throw new Error(
        "Transaction not found."
      );

    }

    /*
    ----------------------------------------
    Gateway Request
    ----------------------------------------
    */

    const gatewayRequest =
      await this.gatewayService
        .createGatewayRequest({

          providerId:
            data.providerId,

          transactionId:
            transaction.id,

          endpoint:
            data.endpoint,

          method:
            data.method,

          requestBody:
            data.requestBody,

          requestHeaders:
            data.requestHeaders

        });

    /*
    ----------------------------------------
    Authorize Transaction
    ----------------------------------------
    */

    const authorization =
      await this.paymentService
        .authorizeTransaction({

          transactionId:
            transaction.id,

          amount:
            transaction.amount,

          currency:
            transaction.currency

        });

    /*
    ----------------------------------------
    Exchange Quote
    ----------------------------------------
    */

    const quote =
      await this.exchangeService
        .calculateQuote(

          data.fromCurrency,

          data.toCurrency,

          transaction.amount

        );

    /*
    ----------------------------------------
    Crypto Conversion
    ----------------------------------------
    */

    const conversion =
      await this.exchangeService
        .createConversion({

          merchantId:
            transaction.merchantId,

          transactionId:
            transaction.id,

          fromCurrency:
            data.fromCurrency,

          toCurrency:
            data.toCurrency,

          fromAmount:
            transaction.amount

        });

    /*
    ----------------------------------------
    Save Gateway Response
    ----------------------------------------
    */

    await this.gatewayService
      .createGatewayResponse({

        gatewayRequestId:
          gatewayRequest.id,

        statusCode: 200,

        responseBody: {

          approved: true

        },

        responseHeaders: {},

        responseTime: 150

      });

    return {

      transaction,

      authorization,

      gatewayRequest,

      conversion,

      quote

    };

  }

  /*
  |--------------------------------------------------------------------------
  | Blockchain Settlement
  |--------------------------------------------------------------------------
  */

  async settleTransaction(data: {

    transactionId: string;

    blockchain: any;

    merchantWalletId: string;

    destinationWalletId: string;

    fromAddress: string;

    toAddress: string;

    currency: any;

  }) {

    const transaction =
      await this.getTransaction(
        data.transactionId
      );

    if (!transaction) {

      throw new Error(
        "Transaction not found."
      );

    }

    if (!transaction.cryptoConversion) {

      throw new Error(
        "Crypto conversion missing."
      );

    }

    /*
    ----------------------------------------
    Wallet Transfer
    ----------------------------------------
    */

    const transfer =
      await this.blockchainService
        .createWalletTransfer({

          merchantId:
            transaction.merchantId,

          fromWalletId:
            data.merchantWalletId,

          toWalletId:
            data.destinationWalletId,

          amount:
            transaction.cryptoConversion
              .toAmount,

          currency:
            data.currency,

          type:
            "settlement",

          cryptoConversionId:
            transaction.cryptoConversion.id

        });

    /*
    ----------------------------------------
    Blockchain Transaction
    ----------------------------------------
    */

    const blockchainTx =
      await this.blockchainService
        .createTransaction({

          blockchain:
            data.blockchain,

          walletId:
            data.merchantWalletId,

          fromAddress:
            data.fromAddress,

          toAddress:
            data.toAddress,

          amount:
            transaction.cryptoConversion
              .toAmount,

          currency:
            data.currency

        });

    /*
    ----------------------------------------
    Complete Transfer
    ----------------------------------------
    */

    await this.blockchainService
      .completeWalletTransfer(
        transfer.id
      );

    /*
    ----------------------------------------
    Settlement
    ----------------------------------------
    */

    const settlement =
      await this.settlementService
        .createSettlement({

          merchantId:
            transaction.merchantId,

          walletId:
            data.merchantWalletId,

          amount:
            transaction.amount,

          currency:
            transaction.currency

        });

    await this.settlementService
      .processSettlement(
        settlement.id
      );

    return {

      blockchainTx,

      transfer,

      settlement

    };

  }

  /*
  |--------------------------------------------------------------------------
  | Complete Transaction
  |--------------------------------------------------------------------------
  */

  async completeTransaction(
    transactionId: string
  ) {

    const transaction =
      await this.getTransaction(
        transactionId
      );

    if (!transaction) {
      throw new Error(
        "Transaction not found."
      );
    }

    await this.paymentService
      .captureTransaction({

        transactionId,

        amount:
          transaction.amount,

        currency:
          transaction.currency

      });

    const paymentAttempt =
  transaction.paymentAttempts?.[0];

if (paymentAttempt) {

  await this.paymentService
    .completePaymentAttempt(

      paymentAttempt.id,

      {
        completed: true
      }

    );

}

    if (transaction.cryptoConversion) {

      await this.exchangeService
        .completeConversion(

          transaction.cryptoConversion.id

        );

    }

    await this.app.prisma.transaction.update({

      where: {

        id: transactionId

      },

      data: {

        status:
          TransactionStatus.SETTLED,

        settlementStatus:
          SettlementStatus.COMPLETED

      }

    });

    return this.getTransaction(
      transactionId
    );

  }

  /*
  |--------------------------------------------------------------------------
  | Fail Transaction
  |--------------------------------------------------------------------------
  */

  async failTransaction(data: {

    transactionId: string;

    reason: string;

    gatewayResponse?: Prisma.JsonValue;

  }) {

    const transaction =
      await this.getTransaction(
        data.transactionId
      );

    if (!transaction) {

      throw new Error(
        "Transaction not found."
      );

    }

    const paymentAttempt =
  transaction.paymentAttempts?.[0];

if (paymentAttempt) {

  await this.paymentService
    .failPaymentAttempt(

      paymentAttempt.id,

      data.reason,

      data.gatewayResponse

    );

}

    if (transaction.cryptoConversion) {

      await this.exchangeService
        .failConversion(

          transaction.cryptoConversion.id

        );

    }

    await this.app.prisma.transaction.update({

      where: {

        id: data.transactionId

      },

      data: {

        status:
          TransactionStatus.FAILED

      }

    });

    return this.getTransaction(
      data.transactionId
    );

  }

  /*
  |--------------------------------------------------------------------------
  | Reverse
  |--------------------------------------------------------------------------
  */

  async reverse(
    transactionId: string,
    reason?: string
  ) {

    const transaction =
      await this.getTransaction(
        transactionId
      );

    if (!transaction) {

      throw new Error(
        "Transaction not found."
      );

    }

    await this.paymentService
      .reverseTransaction({

        transactionId,

        amount:
          transaction.amount,

        currency:
          transaction.currency,

        reason

      });

    await this.app.prisma.transaction.update({

      where: {

        id: transactionId

      },

      data: {

        status:
          TransactionStatus.REVERSED

      }

    });

    return this.getTransaction(
      transactionId
    );

  }

  /*
  |--------------------------------------------------------------------------
  | Void
  |--------------------------------------------------------------------------
  */

  async void(
    transactionId: string,
    reason?: string
  ) {

    const transaction =
      await this.getTransaction(
        transactionId
      );

    if (!transaction) {

      throw new Error(
        "Transaction not found."
      );

    }

    await this.paymentService
      .voidTransaction({

        transactionId,

        reason

      });

    await this.app.prisma.transaction.update({

      where: {

        id: transactionId

      },

      data: {

        status:
          TransactionStatus.VOIDED

      }

    });

    return this.getTransaction(
      transactionId
    );

  }

  /*
  |--------------------------------------------------------------------------
  | Timeline
  |--------------------------------------------------------------------------
  */

  async addTimeline(data: {

    transactionId: string;

    title: string;

    description?: string;

    metadata?: Prisma.JsonValue;

  }) {

    return this.app.prisma.transactionTimeline.create({

      data: {

        transactionId:
          data.transactionId,

        step: data.title,

        status: "INFO",

        message: data.description,

        metadata:
          data.metadata ?? Prisma.JsonNull

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Events
  |--------------------------------------------------------------------------
  */

  async addEvent(data: {

    transactionId: string;

    event: string;

    metadata?: Prisma.JsonValue;

  }) {

    return this.app.prisma.transactionEvent.create({

      data: {

        transactionId:
          data.transactionId,

        eventType: data.event,

        status: "INFO",

        description: undefined

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Status History
  |--------------------------------------------------------------------------
  */

  async addStatusHistory(data: {

    transactionId: string;

    previousStatus: TransactionStatus;

    newStatus: TransactionStatus;

    metadata?: Prisma.JsonValue;

  }) {

    return this.app.prisma.transactionStatusHistory.create({

      data: {

        transactionId:
          data.transactionId,

        oldStatus: data.previousStatus as TransactionStatus,

        newStatus:
          data.newStatus as TransactionStatus,
        
        changedBy:
          undefined,
        
        reason:
          undefined,

        metadata:
          data.metadata ?? Prisma.JsonNull

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Merchant Dashboard
  |--------------------------------------------------------------------------
  */

  async merchantTransactions(
    merchantId: string
  ) {

    return this.app.prisma.transaction.findMany({

      where: {

        merchantId

      },

      include: {

        customer: true,

        terminal: true,

        authorization: true,

        blockchainTransaction: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

}
