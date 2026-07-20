import WalletService from "./wallet.service.js";
import { FastifyInstance } from "fastify";

export default class MerchantService {

  private readonly walletService: WalletService;
  constructor(
    private readonly app: FastifyInstance
  ) {
    this.walletService = new WalletService(app);

  }

  async create(data: any) {

  return this.app.prisma.$transaction(async (tx) => {

    const merchant =
      await tx.merchant.create({

        data: {
          name: data.businessName,
          businessType: data.businessType ?? "GENERAL",
          email: data.email,
          phone: data.phone,
          website: data.website,
          country: data.country,
          state: data.state,
          city: data.city,
          addressLine1: data.address,
          postalCode: data.postalCode
        }

      });

    const wallet =
  await this.walletService.createWallet(

    {
      merchantId: merchant.id,
      name: "Default Wallet",
      currency: merchant.currency
    },

        tx as any

      );

    return {
      merchant,
      wallet
    };

  });

}

  async findById(id: string) {

    return this.app.prisma.merchant.findUnique({

      where: {

        id

      },

      include: {

        users: true,

        terminals: true,

        wallets: true,

        transactions: true

      }

    });

  }

  async list(
  page = 1,
  limit = 10
) {
  const skip = (page - 1) * limit;

  const [items, total] =
    await this.app.prisma.$transaction([
      this.app.prisma.merchant.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      this.app.prisma.merchant.count(),
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

  async update(
    id: string,
    data: any
  ) {

    return this.app.prisma.merchant.update({

      where: {

        id

      },

      data

    });

  }

  async delete(
    id: string
  ) {

    return this.app.prisma.merchant.delete({

      where: {

        id

      }

    });

  }

  async dashboard(
    merchantId: string
  ) {

    const [

      terminals,

      wallets,

      customers,

      transactions,

      settlements

    ] = await Promise.all([

      this.app.prisma.terminal.count({

        where: {

          merchantId

        }

      }),

      this.app.prisma.wallet.count({

        where: {

          merchantId

        }

      }),

      this.app.prisma.customer.count({

        where: {

          merchantId

        }

      }),

      this.app.prisma.transaction.count({

        where: {

          merchantId

        }

      }),

      this.app.prisma.settlement.count({

        where: {

          merchantId

        }

      })

    ]);

    return {

      terminals,

      wallets,

      customers,

      transactions,

      settlements

    };

  }

}
