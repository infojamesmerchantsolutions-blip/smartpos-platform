import {
  Prisma
} from "@prisma/client";

import { FastifyInstance } from "fastify";

import crypto from "crypto";

export default class BlockchainService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  /*
  |--------------------------------------------------------------------------
  | Helpers
  |--------------------------------------------------------------------------
  */

  private generateTxHash(): string {

    return crypto
      .randomBytes(32)
      .toString("hex");

  }

  /*
  |--------------------------------------------------------------------------
  | Blockchain Transaction
  |--------------------------------------------------------------------------
  */

  async createTransaction(data: {

    blockchain: any;

    walletId?: string;

    fromAddress: string;

    toAddress: string;

    amount: Prisma.Decimal;

    currency: any;

    fee?: Prisma.Decimal;

    gasPrice?: Prisma.Decimal;

    nonce?: number;

    metadata?: Prisma.JsonValue;

    payload?: Prisma.JsonValue;

  }) {

    return this.app.prisma.blockchainTransaction.create({

      data: {

        txHash: this.generateTxHash(),

        blockchainId: data.blockchain,

        walletId: data.walletId,

        fromAddress: data.fromAddress,

        toAddress: data.toAddress,

        amount: data.amount,

        currency: data.currency,

        fee: data.fee ??
          new Prisma.Decimal(0),

        gasPrice: data.gasPrice,

        nonce: data.nonce,

        metadata: data.metadata ?? Prisma.JsonNull,

        data: data.payload ?? Prisma.JsonNull,

        status: "pending"

      }

    });

  }

  async markConfirmed(

    txId: string,

    blockNumber: number,

    blockHash: string,

    confirmations: number

  ) {

    return this.app.prisma.blockchainTransaction.update({

      where: {

        id: txId

      },

      data: {

        blockNumber,

        blockHash,

        confirmations,

        status: "confirmed"

      }

    });

  }

  async markFailed(

    txId: string

  ) {

    return this.app.prisma.blockchainTransaction.update({

      where: {

        id: txId

      },

      data: {

        status: "failed"

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Confirmations
  |--------------------------------------------------------------------------
  */

  async addConfirmation(data: {

    txId: string;

    confirmations: number;

    blockHash?: string;

    blockTime?: Date;

    metadata?: Prisma.JsonValue;

  }) {

    await this.app.prisma.blockchainTransaction.update({

      where: {

        id: data.txId

      },

      data: {

        confirmations: data.confirmations

      }

    });

    return this.app.prisma.blockchainConfirmation.create({

      data: {

        txId: data.txId,

        confirmations: data.confirmations,

        blockHash: data.blockHash,

        blockTime: data.blockTime,

        metadata: data.metadata ?? Prisma.JsonNull,

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Wallet Transfer
  |--------------------------------------------------------------------------
  */

  async createWalletTransfer(data: {

    merchantId: string;

    fromWalletId: string;

    toWalletId: string;

    amount: Prisma.Decimal;

    currency: any;

    fee?: Prisma.Decimal;

    type: string;

    cryptoConversionId?: string;

    blockchainTxId?: string;

    metadata?: Prisma.JsonValue;

  }) {

    const reference =
      `WT-${Date.now()}-${crypto
        .randomBytes(4)
        .toString("hex")
        .toUpperCase()}`;

    return this.app.prisma.walletTransfer.create({

      data: {

        merchantId: data.merchantId,

        fromWalletId: data.fromWalletId,

        toWalletId: data.toWalletId,

        amount: data.amount,

        currency: data.currency,

        fee: data.fee ??
          new Prisma.Decimal(0),

        type: data.type,

        status: "pending",

        reference,

        blockchainTxId:
          data.blockchainTxId,

        cryptoConversionId:
          data.cryptoConversionId,

        metadata: data.metadata ?? Prisma.JsonNull,

      }

    });

  }

  async completeWalletTransfer(

    walletTransferId: string

  ) {

    return this.app.prisma.walletTransfer.update({

      where: {

        id: walletTransferId

      },

      data: {

        status: "completed",

        completedAt: new Date()

      }

    });

  }

  async failWalletTransfer(

    walletTransferId: string

  ) {

    return this.app.prisma.walletTransfer.update({

      where: {

        id: walletTransferId

      },

      data: {

        status: "failed"

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Blockchain Fees
  |--------------------------------------------------------------------------
  */

  async latestFee(

    blockchain: any,

    feeType: string

  ) {

    return this.app.prisma.blockchainFee.findFirst({

      where: {

        blockchain,

        feeType

      },

      orderBy: {

        timestamp: "desc"

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Lookup
  |--------------------------------------------------------------------------
  */

  async findTransaction(

    txId: string

  ) {

    return this.app.prisma.blockchainTransaction.findUnique({

      where: {

        id: txId

      },

      include: {

        wallet: true,

        confirmationsHistory: true,

        walletTransfers: true

      }

    });

  }

  async findTransfer(

    transferId: string

  ) {

    return this.app.prisma.walletTransfer.findUnique({

      where: {

        id: transferId

      },

      include: {

        merchant: true,

        fromWallet: true,

        toWallet: true,

        blockchainTransaction: true,

        cryptoConversion: true

      }

    });

  }

}
