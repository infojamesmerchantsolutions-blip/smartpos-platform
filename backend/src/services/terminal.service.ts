import { FastifyInstance } from "fastify";

export default class TerminalService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async register(data: any) {

    const existing =
      await this.app.prisma.terminal.findFirst({

        where: {

          OR: [

            {
              serialNumber: data.serialNumber
            },

            {
              terminalId:
                data.terminalId
            }

          ]

        }

      });

    if (existing) {
      throw new Error(
        "Terminal already registered."
      );
    }

    return this.app.prisma.terminal.create({

      data: {

        ...data,

        status: "PENDING"

      }

    });

  }

  async activate(
    terminalId: string
  ) {

    return this.app.prisma.terminal.update({

      where: {

        id: terminalId

      },

      data: {

        status: "ONLINE",

        lastHeartbeatAt: new Date()

      }

    });

  }

  async heartbeat(
    terminalId: string
  ) {

    return this.app.prisma.terminal.update({

      where: {

        id: terminalId

      },

      data: {

        lastHeartbeatAt: new Date()

      }

    });

  }

  async findById(
    id: string
  ) {

    return this.app.prisma.terminal.findUnique({

      where: {

        id

      },

      include: {

        merchant: true,

        transactions: true,

        device: true

      }

    });

  }

  async deactivate(
    id: string
  ) {

    return this.app.prisma.terminal.update({

      where: {

        id

      },

      data: {

        status: "OFFLINE"

      }

    });

  }

}
