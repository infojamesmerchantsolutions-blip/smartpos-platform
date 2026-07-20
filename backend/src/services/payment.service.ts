import {
  Prisma,
  PaymentStatus,
  TransactionStatus,
  SettlementStatus
} from "@prisma/client";

import { FastifyInstance } from "fastify";
import crypto from "crypto";
export default class PaymentService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  private generateReference(): string {

    return `TX-${Date.now()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

  }

  private generateClientSecret(): string {

    return crypto
      .randomBytes(32)
      .toString("hex");

  }

  /*
  |--------------------------------------------------------------------------
  | Payment Intent
  |--------------------------------------------------------------------------
  */

  async createPaymentIntent(data: {

    merchantId: string;

    customerId?: string;

    paymentMethodId?: string;

    amount: Prisma.Decimal;

    currency: any;

    description?: string;

    metadata?: Prisma.JsonValue;

    expiresAt?: Date;

  }) {

    return this.app.prisma.paymentIntent.create({

      data: {

        merchantId: data.merchantId,

        customerId: data.customerId,

        paymentMethodId: data.paymentMethodId,

        amount: data.amount,

        currency: data.currency,

        description: data.description,

        metadata: data.metadata ?? Prisma.JsonNull,

        clientSecret: this.generateClientSecret(),

        expiresAt: data.expiresAt,

        status: PaymentStatus.PENDING

      }

    });

  }

  async getPaymentIntent(

    paymentIntentId: string

  ) {

    return this.app.prisma.paymentIntent.findUnique({

      where: {

        id: paymentIntentId

      },

      include: {

        merchant: true,

        customer: true,

        paymentAttempts: true,

        transactions: true

      }

    });

  }

  async listPaymentIntents(
  page = 1,
  limit = 10
) {

  const skip =
    (page - 1) * limit;

  const [items, total] =
    await this.app.prisma.$transaction([

      this.app.prisma.paymentIntent.findMany({

        skip,

        take: limit,

        include: {

          merchant: true,

          customer: true,

        },

        orderBy: {

          createdAt: "desc",

        },

      }),

      this.app.prisma.paymentIntent.count(),

    ]);

  return {

    items,

    pagination: {

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

    },

  };

}

async listTransactions(
  page = 1,
  limit = 10
) {

  const skip =
    (page - 1) * limit;

  const [
    items,
    total,
  ] = await this.app.prisma.$transaction([

    this.app.prisma.transaction.findMany({

      skip,

      take: limit,

      orderBy: {

        createdAt: "desc",

      },

      include: {

        merchant: true,

        terminal: true,

      },

    }),

    this.app.prisma.transaction.count(),

  ]);

  return {

    items,

    pagination: {

      page,

      limit,

      total,

      pages: Math.ceil(total / limit),

    },

  };

}

  async expirePaymentIntent(

    paymentIntentId: string

  ) {

    return this.app.prisma.paymentIntent.update({

      where: {

        id: paymentIntentId

      },

      data: {

        status: PaymentStatus.EXPIRED,

        expiresAt: new Date()

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Transaction
  |--------------------------------------------------------------------------
  */

  async createTransaction(data: {

    merchantId: string;

    terminalId?: string;

    customerId?: string;

    walletId?: string;

    amount: Prisma.Decimal;

    currency: any;

    paymentMethod: string;

    type: string;

    description?: string;

    paymentIntentId?: string;

    metadata?: Prisma.JsonValue;

  }) {

    const reference =
  this.generateReference();

const transaction =
  await this.app.prisma.transaction.create({

    data: {

      merchantId: data.merchantId,

      terminalId: data.terminalId,

      customerId: data.customerId,

      walletId: data.walletId,

      amount: data.amount,

      currency: data.currency,

      paymentMethod: data.paymentMethod,

      type: data.type,

      description: data.description,

      metadata: data.metadata ?? Prisma.JsonNull,

      settlementStatus:
        SettlementStatus.PENDING,

      reference,

      status:
        TransactionStatus.INITIATED,

      paymentIntentId:
        data.paymentIntentId,

    }

  });

return transaction;

  }

  async updateTransactionStatus(

    transactionId: string,

    status: TransactionStatus

  ) {

    return this.app.prisma.transaction.update({

      where: {

        id: transactionId

      },

      data: {

        status

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Payment Attempts
  |--------------------------------------------------------------------------
  */

  async createPaymentAttempt(data: {

    paymentIntentId: string;

    transactionId?: string;

    amount: Prisma.Decimal;

    currency: any;

  }) {

    return this.app.prisma.paymentAttempt.create({

      data: {

        paymentIntentId: data.paymentIntentId,

        transactionId: data.transactionId,

        amount: data.amount,

        currency: data.currency,

        status: PaymentStatus.PENDING

      }

    });

  }

  async completePaymentAttempt(

    paymentAttemptId: string,

    gatewayResponse: Prisma.JsonValue

  ) {

    return this.app.prisma.paymentAttempt.update({

      where: {

        id: paymentAttemptId

      },

      data: {

        status: PaymentStatus.SETTLED,

        gatewayResponse: gatewayResponse ?? Prisma.JsonNull

      }

    });

  }

  async failPaymentAttempt(

    paymentAttemptId: string,

    errorMessage: string,

    gatewayResponse?: Prisma.JsonValue

  ) {

    return this.app.prisma.paymentAttempt.update({

      where: {

        id: paymentAttemptId

      },

      data: {

        status: PaymentStatus.FAILED,

        errorMessage,

        gatewayResponse: gatewayResponse ?? Prisma.JsonNull

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Authorization
  |--------------------------------------------------------------------------
  */

  async authorizeTransaction(data: {

    transactionId: string;

    amount: Prisma.Decimal;

    currency: any;

    authorizationCode?: string;

    gatewayResponse?: Prisma.JsonValue;

    message?: string;

  }) {

    const authorization =
      await this.app.prisma.authorization.create({

        data: {

          transactionId: data.transactionId,

          authorizationCode: data.authorizationCode,

          amount: data.amount,

          currency: data.currency,

          status: "approved",

          message: data.message,

          gatewayResponse: data.gatewayResponse ?? Prisma.JsonNull

        }

      });

    await this.app.prisma.transaction.update({

      where: {

        id: data.transactionId

      },

      data: {

        status: TransactionStatus.AUTHORIZED

      }

    });

    return authorization;

  }

  async declineAuthorization(

    transactionId: string,

    message: string,

    gatewayResponse?: Prisma.JsonValue

  ) {

    return this.app.prisma.authorization.create({

      data: {

        transactionId,

        amount: new Prisma.Decimal(0),

        currency: "USD",

        status: "declined",

        message,

        gatewayResponse: gatewayResponse ?? Prisma.JsonNull

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Capture
  |--------------------------------------------------------------------------
  */

  async captureTransaction(data: {

    transactionId: string;

    amount: Prisma.Decimal;

    currency: any;

    gatewayResponse?: Prisma.JsonValue;

  }) {

    const capture =
      await this.app.prisma.capture.create({

        data: {

          transactionId: data.transactionId,

          amount: data.amount,

          currency: data.currency,

          status: "completed",

          gatewayResponse: data.gatewayResponse ?? Prisma.JsonNull

        }

      });

    await this.app.prisma.transaction.update({

      where: {

        id: data.transactionId

      },

      data: {

        status: TransactionStatus.SETTLED

      }

    });

    return capture;

  }

  /*
  |--------------------------------------------------------------------------
  | Reversal
  |--------------------------------------------------------------------------
  */

  async reverseTransaction(data: {

    transactionId: string;

    amount: Prisma.Decimal;

    currency: any;

    reason?: string;

    gatewayResponse?: Prisma.JsonValue;

  }) {

    const reversal =
      await this.app.prisma.reversal.create({

        data: {

          transactionId: data.transactionId,

          amount: data.amount,

          currency: data.currency,

          reason: data.reason,

          status: "completed",

          gatewayResponse: data.gatewayResponse ?? Prisma.JsonNull

        }

      });

    await this.app.prisma.transaction.update({

      where: {

        id: data.transactionId

      },

      data: {

        status: TransactionStatus.REVERSED

      }

    });

    return reversal;

  }

  /*
  |--------------------------------------------------------------------------
  | Void
  |--------------------------------------------------------------------------
  */

  async voidTransaction(data: {

    transactionId: string;

    reason?: string;

    gatewayResponse?: Prisma.JsonValue;

  }) {

    const voidRecord =
      await this.app.prisma.voidTransaction.create({

        data: {

          transactionId: data.transactionId,

          reason: data.reason,

          status: "completed",

          gatewayResponse: data.gatewayResponse ?? Prisma.JsonNull

        }

      });

    await this.app.prisma.transaction.update({

      where: {

        id: data.transactionId

      },

      data: {

        status: TransactionStatus.VOIDED

      }

    });

    return voidRecord;

  }

  /*
  |--------------------------------------------------------------------------
  | Transaction Helpers
  |--------------------------------------------------------------------------
  */

  async findTransactionById(
    transactionId: string
  ) {

    return this.app.prisma.transaction.findUnique({

      where: {

        id: transactionId

      },

      include: {

        merchant: true,

        customer: true,

        terminal: true,

        wallet: true,

        authorization: true,

        capture: true,

        reversal: true,

        voidTransaction: true,

        paymentIntent: true,

        paymentAttempts: true,

        gatewayRequest: {
          include: {response: true
            }
          },

        blockchainTransaction: true,

        refunds: true,

        events: true,

        timeline: true,

        statusHistory: true

      }

    });

  }

  async merchantTransactions(
    merchantId: string
  ) {

    return this.app.prisma.transaction.findMany({

      where: {

        merchantId

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  async customerTransactions(
    customerId: string
  ) {

    return this.app.prisma.transaction.findMany({

      where: {

        customerId

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

}
