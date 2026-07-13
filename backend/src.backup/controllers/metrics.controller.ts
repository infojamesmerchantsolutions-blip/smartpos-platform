import {

  FastifyReply,

  FastifyRequest

} from "fastify";

import MetricsService from "../services/metrics.service";

export default class MetricsController {

  constructor(

    private readonly metrics: MetricsService

  ) {}

  getMetrics = async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    return reply.send({

      success: true,

      data:

        this.metrics.all()

    });

  };

  resetMetrics = async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    this.metrics.reset();

    return reply.send({

      success: true,

      message:

        "Metrics reset."

    });

  };

}
