import { FastifyInstance } from "fastify";
import {Prisma } from "@prisma/client";

export default class WalletService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async createWallet(data: {
  merchantId: string;
  name: string;
  currency: any;
  balance?: Prisma.Decimal;
  availableBalance?: Prisma.Decimal;
  reservedBalance?: Prisma.Decimal;
}) {

  return this.app.prisma.wallet.create({

    data: {

      merchantId: data.merchantId,

      name: data.name,

      currency: data.currency,

      balance:
        data.balance ??
        new Prisma.Decimal(0),

      availableBalance:
        data.availableBalance ??
        new Prisma.Decimal(0),

      reservedBalance:
        data.reservedBalance ??
        new Prisma.Decimal(0)

    }

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
    amount: Prisma.Decimal
  ) {

    const wallet =
      await this.getWallet(walletId);

    if (!wallet) {
      throw new Error(
        "Wallet not found."
      );
    }

    const balance =
      new Prisma.Decimal(wallet.balance);
    
      const newBalance =
          balance.plus(amount);

    return this.app.prisma.wallet.update({

      where: {

        id: walletId

      },

      data: {

        balance: newBalance,
        availableBalance: newBalance

      }

    });

  }

  async debitWallet(
    walletId: string,
    amount: Prisma.Decimal
  ) {

    const wallet =
      await this.getWallet(walletId);

    if (!wallet) {
      throw new Error(
        "Wallet not found."
      );
    }

    const balance =
  new Prisma.Decimal(wallet.balance);

if (balance.lessThan(amount)) {
  throw new Error(
    "Insufficient wallet balance."
  );
}

const newBalance =
  balance.minus(amount);

return this.app.prisma.wallet.update({

  where: {

    id: walletId

  },

  data: {

    balance: newBalance,
    availableBalance: newBalance

  }

});

  }

  async reserveFunds(
  walletId: string,
  amount: Prisma.Decimal
) {

  const wallet =
    await this.getWallet(walletId);

  if (!wallet) {

    throw new Error(
      "Wallet not found."
    );

  }

  const availableBalance =
    new Prisma.Decimal(
      wallet.availableBalance
    );

  const reservedBalance =
    new Prisma.Decimal(
      wallet.reservedBalance
    );

  if (
    availableBalance.lessThan(amount)
  ) {

    throw new Error(
      "Insufficient available balance."
    );

  }

  return this.app.prisma.wallet.update({

    where: {

      id: walletId

    },

    data: {

      availableBalance:
        availableBalance.minus(amount),

      reservedBalance:
        reservedBalance.plus(amount)

    }

  });

}

  async releaseFunds(
  walletId: string,
  amount: Prisma.Decimal
) {

  const wallet =
    await this.getWallet(walletId);

  if (!wallet) {

    throw new Error(
      "Wallet not found."
    );

  }

  const availableBalance =
    new Prisma.Decimal(
      wallet.availableBalance
    );

  const reservedBalance =
    new Prisma.Decimal(
      wallet.reservedBalance
    );

  if (
    reservedBalance.lessThan(amount)
  ) {

    throw new Error(
      "Insufficient reserved balance."
    );

  }

  return this.app.prisma.wallet.update({

    where: {

      id: walletId

    },

    data: {

      availableBalance:
        availableBalance.plus(amount),

      reservedBalance:
        reservedBalance.minus(amount)

    }

  });

}

  async captureFunds(
  walletId: string,
  amount: Prisma.Decimal
) {

  const wallet =
    await this.getWallet(walletId);

  if (!wallet) {

    throw new Error(
      "Wallet not found."
    );

  }

  const balance =
    new Prisma.Decimal(
      wallet.balance
    );

  const reservedBalance =
    new Prisma.Decimal(
      wallet.reservedBalance
    );

  const availableBalance =
    new Prisma.Decimal(
      wallet.availableBalance
    );

  if (
    reservedBalance.lessThan(amount)
  ) {

    throw new Error(
      "Insufficient reserved balance."
    );

  }

  return this.app.prisma.wallet.update({

    where: {

      id: walletId

    },

    data: {

      balance:
        balance.minus(amount),

      reservedBalance:
        reservedBalance.minus(amount),

      availableBalance:
        availableBalance

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
