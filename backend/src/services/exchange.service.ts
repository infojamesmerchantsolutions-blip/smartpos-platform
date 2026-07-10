import { FastifyInstance } from "fastify";

export default class ExchangeService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async latestRate(
    fiatCurrency: string,
    cryptoCurrency: string
  ) {

    return this.app.prisma.exchangeRate.findFirst({

      where: {

        fiatCurrency,

        cryptoCurrency,

        active: true

      },

      orderBy: {

        createdAt: "desc"

      }

    });

  }

  async createQuote(
    paymentIntentId: string,
    fiatAmount: number,
    fiatCurrency: string,
    cryptoCurrency: string
  ) {

    const rate =
      await this.latestRate(
        fiatCurrency,
        cryptoCurrency
      );

    if (!rate) {
      throw new Error("Exchange rate unavailable.");
    }

    const cryptoAmount =
      fiatAmount / Number(rate.rate);

    return this.app.prisma.cryptoQuote.create({

      data: {

        paymentIntentId,

        fiatAmount,

        fiatCurrency,

        cryptoAmount,

        cryptoCurrency,

        exchangeRate: rate.rate,

        expiresAt: new Date(
          Date.now() + 60000
        )

      }

    });

  }

}
