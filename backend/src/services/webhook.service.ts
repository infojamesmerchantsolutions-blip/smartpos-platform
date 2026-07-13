import { FastifyInstance } from "fastify";
import { WebhookStatus } from "@prisma/client";

export default class WebhookService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  /*
  |--------------------------------------------------------------------------
  | Receive Webhook
  |--------------------------------------------------------------------------
  */

  async receiveWebhook(data: {
    webhookId: string;
    event: string;
    payload: any;
    transactionId?: string;
  }) {

    return this.app.prisma.webhookDelivery.create({

      data: {

        webhookId: data.webhookId,

        event: data.event,

        payload: data.payload,

        transactionId: data.transactionId,

        status: WebhookStatus.PENDING

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Process Webhook
  |--------------------------------------------------------------------------
  */

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

        attempts: {
          increment: 1
        },

        status: WebhookStatus.RETRYING

      }

    });

    return webhook;

  }

  /*
  |--------------------------------------------------------------------------
  | Complete Webhook
  |--------------------------------------------------------------------------
  */

  async completeWebhook(
    webhookId: string,
    responseStatus?: number,
    responseBody?: string
  ) {

    return this.app.prisma.webhookDelivery.update({

      where: {
        id: webhookId
      },

      data: {

        status: WebhookStatus.DELIVERED,

        deliveredAt: new Date(),

        responseStatus,

        responseBody

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Fail Webhook
  |--------------------------------------------------------------------------
  */

  async failWebhook(
    webhookId: string,
    reason: string
  ) {

    return this.app.prisma.webhookDelivery.update({

      where: {
        id: webhookId
      },

      data: {

        status: WebhookStatus.FAILED,

        error: reason

      }

    });

  }

}