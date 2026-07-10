import { FastifyInstance } from "fastify";
import Decimal from "decimal.js";

export default class WalletService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async createWallet(data: any) {

    return this.app.prisma.wallet.create({

      data

    });

  }

  async getWallet(id: string) {

    return this.app.prisma.wallet.findUnique({

      where: {

        id

      }

    });

  }

  async creditWallet(
    walletId: string,
    amount: Decimal
  ) {

    const wallet =
      await this.getWallet(walletId);

    if (!wallet) {
      throw new Error(
        "Wallet not found."
      );
    }

    const balance =
      new Decimal(wallet.balance.toString());

    return this.app.prisma.wallet.update({

      where: {

        id: walletId

      },

      data: {

        balance: balance.plus(amount).toFixed()

      }

    });

  }

  async debitWallet(
    walletId: string,
    amount: Decimal
  ) {

    const wallet =
      await this.getWallet(walletId);

    if (!wallet) {
      throw new Error(
        "Wallet not found."
      );
    }

    const balance =
      new Decimal(wallet.balance.toString());

    if (balance.lessThan(amount)) {
      throw new Error(
        "Insufficient wallet balance."
      );
    }

    return this.app.prisma.wallet.update({

      where: {

        id: walletId

      },

      data: {

        balance: balance.minus(amount).toFixed()

      }

    });

  }

  async merchantWallets(
    merchantId: string
  ) {

    return this.app.prisma.wallet.findMany({

      where: {

        merchantId

      }

    });

  }

}
