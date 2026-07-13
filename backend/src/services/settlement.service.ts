import {
  Prisma,
  SettlementStatus
} from "@prisma/client";

import { FastifyInstance } from "fastify";

import crypto from "crypto";

export default class SettlementService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  private generateReference(): string {

    return `SET-${Date.now()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

  }

  /*
  |--------------------------------------------------------------------------
  | Settlement
  |--------------------------------------------------------------------------
  */

  async createSettlement(data: {

    merchantId: string;

    walletId: string;

    bankAccountId?: string;

    batchId?: string;

    amount: Prisma.Decimal;

    currency: any;

    fee?: Prisma.Decimal;

    metadata?: Prisma.JsonValue;

  }) {

    const fee =
      data.fee ??
      new Prisma.Decimal(0);

    const netAmount =
      data.amount.sub(fee);

    return this.app.prisma.settlement.create({

      data: {

        merchantId: data.merchantId,

        walletId: data.walletId,

        bankAccountId: data.bankAccountId,

        batchId: data.batchId,

        amount: data.amount,

        currency: data.currency,

        fee,

        netAmount,

        metadata: data.metadata ?? Prisma.JsonNull,

        reference:
          this.generateReference(),

        status:
          SettlementStatus.PENDING

      }

    });

  }

  async processSettlement(

    settlementId: string

  ) {

    return this.app.prisma.settlement.update({

      where: {

        id: settlementId

      },

      data: {

        status:
          SettlementStatus.PROCESSING,

        processedAt:
          new Date(),

        attemptCount: {

          increment: 1

        }

      }

    });

  }

  async completeSettlement(

    settlementId: string

  ) {

    return this.app.prisma.settlement.update({

      where: {

        id: settlementId

      },

      data: {

        status:
          SettlementStatus.COMPLETED,

        completedAt:
          new Date()

      }

    });

  }

  async failSettlement(

    settlementId: string

  ) {

    return this.app.prisma.settlement.update({

      where: {

        id: settlementId

      },

      data: {

        status:
          SettlementStatus.FAILED,

        attemptCount: {

          increment: 1

        }

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Batch
  |--------------------------------------------------------------------------
  */

  async createBatch(data: {

    merchantId: string;

    totalAmount: Prisma.Decimal;

    currency: any;

    totalFees: Prisma.Decimal;

    totalNet: Prisma.Decimal;

    transactionCount: number;

    metadata?: Prisma.JsonValue;

  }) {

    return this.app.prisma.settlementBatch.create({

      data: {

        merchantId: data.merchantId,

        batchReference:

          `BATCH-${Date.now()}`,

        totalAmount:
          data.totalAmount,

        currency:
          data.currency,

        totalFees:
          data.totalFees,

        totalNet:
          data.totalNet,

        transactionCount:
          data.transactionCount,

        metadata:
          data.metadata ?? Prisma.JsonNull

      }

    });

  }

  async completeBatch(

    batchId: string

  ) {

    return this.app.prisma.settlementBatch.update({

      where: {

        id: batchId

      },

      data: {

        status:
          SettlementStatus.COMPLETED,

        completedAt:
          new Date()

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Lookup
  |--------------------------------------------------------------------------
  */

  async findSettlement(

    settlementId: string

  ) {

    return this.app.prisma.settlement.findUnique({

      where: {

        id: settlementId

      },

      include: {

        merchant: true,

        wallet: true,

        bankAccount: true,

        settlementBatch: true,

        attempts: true,

        fees: true

      }

    });

  }

  async merchantSettlements(

    merchantId: string

  ) {

    return this.app.prisma.settlement.findMany({

      where: {

        merchantId

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  async batchSettlements(

    batchId: string

  ) {

    return this.app.prisma.settlement.findMany({

      where: {

        batchId

      }

    });

  }

}
