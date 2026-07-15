import { FastifyInstance } from "fastify";

export default class MerchantService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async create(data: any) {

    return this.app.prisma.merchant.create({

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
