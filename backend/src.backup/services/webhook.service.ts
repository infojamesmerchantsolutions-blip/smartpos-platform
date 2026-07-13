import { FastifyInstance } from "fastify";

export default class WebhookService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  async receiveWebhook(data: {

    provider: string;

    event: string;

    payload: any;

    signature?: string;

    headers?: any;

  }) {

    const webhook =
      await this.app.prisma.webhookDelivery.create({

        data: {

          provider:
            data.provider,

          event:
            data.event,

          payload:
            data.payload,

          signature:
            data.signature,

          headers:
            data.headers,

          status:
            "RECEIVED"

        }

      });

    return webhook;

  }

  async processWebhook(
    webhookId: string
  ) {

    const webhook =
      await this.app.prisma.webhookDelivery.findUnique({

        where: {

          id: webhookId

        }

      });

    if (!webhook) {

      throw new Error(
        "Webhook not found."
      );

    }

    await this.app.prisma.webhookDelivery.update({

      where: {

        id: webhookId

      },

      data: {

        status:
          "PROCESSING"

      }

    });

    return webhook;

  }

  async completeWebhook(
    webhookId: string
  ) {

    return this.app.prisma.webhookDelivery.update({

      where: {

        id: webhookId

      },

      data: {

        status:
          "COMPLETED",

        processedAt:
          new Date()

      }

    });

  }

  async failWebhook(
    webhookId: string,
    reason: string
  ) {

    return this.app.prisma.webhookDelivery.update({

      where: {

        id: webhookId

      },

      data: {

        status:
          "FAILED",

        error:
          reason

      }

    });

  }

}
