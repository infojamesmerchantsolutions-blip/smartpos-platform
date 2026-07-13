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
              terminalIdentifier:
                data.terminalIdentifier
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

        status: "ACTIVE",

        lastHeartbeat: new Date()

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

        lastHeartbeat: new Date()

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

        devices: true

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

        status: "INACTIVE"

      }

    });

  }

}
