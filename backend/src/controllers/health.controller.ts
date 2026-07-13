import {

  FastifyReply,

  FastifyRequest

} from "fastify";

import HealthService from "../services/health.service.js";

export default class HealthController {

  constructor(

    private readonly service: HealthService

  ) {}

  getHealth = async (

    request: FastifyRequest,

    reply: FastifyReply

  ) => {

    const result =

      await this.service.status();

    return reply.send({

      success: true,

      data: result

    });

  };

}
