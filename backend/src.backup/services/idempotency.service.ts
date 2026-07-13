import { FastifyInstance } from "fastify";

export default class IdempotencyService {

  constructor(

    private readonly app: FastifyInstance

  ) {}

  async find(

    key: string

  ) {

    return this.app.prisma.idempotencyKey.findUnique({

      where: {

        key

      }

    });

  }

  async exists(

    key: string

  ) {

    const record =

      await this.find(

        key

      );

    return !!record;

  }

  async create(

    key: string,

    requestHash: string,

    response: unknown,

    expiresAt: Date

  ) {

    return this.app.prisma.idempotencyKey.create({

      data: {

        key,

        requestHash,

        response,

        expiresAt

      }

    });

  }

  async consume(

    key: string

  ) {

    return this.app.prisma.idempotencyKey.update({

      where: {

        key

      },

      data: {

        consumedAt:

          new Date()

      }

    });

  }

  async removeExpired() {

    return this.app.prisma.idempotencyKey.deleteMany({

      where: {

        expiresAt: {

          lt: new Date()

        }

      }

    });

  }

}
