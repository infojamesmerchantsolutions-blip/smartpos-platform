import { Prisma } from "@prisma/client";
import { FastifyInstance } from "fastify";

export default class GatewayService {

  constructor(
    private readonly app: FastifyInstance
  ) {}

  /*
  |--------------------------------------------------------------------------
  | Payment Provider
  |--------------------------------------------------------------------------
  */

  async getProvider(
    providerId: string
  ) {

    return this.app.prisma.paymentProvider.findUnique({

      where: {
        id: providerId
      }

    });

  }

  async activeProviders() {

    return this.app.prisma.paymentProvider.findMany({

      where: {
        isActive: true
      },

      orderBy: {
        createdAt: "desc"
      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Gateway Request
  |--------------------------------------------------------------------------
  */

  async createGatewayRequest(data: {

    providerId: string;

    transactionId?: string;

    endpoint: string;

    method: string;

    requestBody: Prisma.JsonValue;

    requestHeaders: Prisma.JsonValue;

  }) {

    return this.app.prisma.gatewayRequest.create({

      data: {

        providerId: data.providerId,

        transactionId: data.transactionId,

        endpoint: data.endpoint,

        method: data.method,

        requestBody: data.requestBody ?? Prisma.JsonNull,

        requestHeaders: data.requestHeaders ?? Prisma.JsonNull,

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Gateway Response
  |--------------------------------------------------------------------------
  */

  async createGatewayResponse(data: {

    gatewayRequestId: string;

    statusCode: number;

    responseBody: Prisma.JsonValue;

    responseHeaders: Prisma.JsonValue;

    error?: string;

    responseTime?: number;

  }) {

    return this.app.prisma.gatewayResponse.create({

      data: {

        gatewayRequestId: data.gatewayRequestId,

        statusCode: data.statusCode,

        responseBody: data.responseBody ?? Prisma.JsonNull,

        responseHeaders: data.responseHeaders ?? Prisma.JsonNull,

        error: data.error,

        responseTime: data.responseTime

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Lookup
  |--------------------------------------------------------------------------
  */

  async getGatewayRequest(
    id: string
  ) {

    return this.app.prisma.gatewayRequest.findUnique({

      where: {

        id

      },

      include: {

        provider: true,

        response: true,

        transaction: true

      }

    });

  }

  async getGatewayResponse(
    id: string
  ) {

    return this.app.prisma.gatewayResponse.findUnique({

      where: {

        id

      },

      include: {

        gatewayRequest: {

          include: {

            provider: true,

            transaction: true

          }

        }

      }

    });

  }

  async transactionGateway(
    transactionId: string
  ) {

    return this.app.prisma.gatewayRequest.findFirst({

      where: {

        transactionId

      },

      include: {

        provider: true,

        response: true

      }

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Retry
  |--------------------------------------------------------------------------
  */

  async recreateGatewayRequest(

    gatewayRequestId: string

  ) {

    const previous =
      await this.getGatewayRequest(
        gatewayRequestId
      );

    if (!previous) {

      throw new Error(
        "Gateway request not found."
      );

    }

    return this.createGatewayRequest({

      providerId:
        previous.providerId,

      transactionId:
        previous.transactionId ?? undefined,

      endpoint:
        previous.endpoint,

      method:
        previous.method,

      requestBody:
        previous.requestBody,

      requestHeaders:
        previous.requestHeaders

    });

  }

  /*
  |--------------------------------------------------------------------------
  | Statistics
  |--------------------------------------------------------------------------
  */

  async providerStatistics(

    providerId: string

  ) {

    const totalRequests =
      await this.app.prisma.gatewayRequest.count({

        where: {

          providerId

        }

      });

    const totalResponses =
      await this.app.prisma.gatewayResponse.count({

        where: {

          gatewayRequest: {

            providerId

          }

        }

      });

    return {

      providerId,

      totalRequests,

      totalResponses

    };

  }

}
