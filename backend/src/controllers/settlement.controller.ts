import { FastifyReply, FastifyRequest } from "fastify";

import SettlementService from "../services/settlement.service.js";

export default class SettlementController {

  constructor(
    private readonly settlementService: SettlementService
  ) {}

  createSettlement = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const settlement =
      await this.settlementService.createSettlement(
        request.body as any
      );

    return reply.code(201).send({

      success: true,

      message: "Settlement Created",

      data: settlement

    });

  };

  processSettlement = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const { id } =
      request.params as any;

    const settlement =
      await this.settlementService.processSettlement(
        id
      );

    return reply.send({

      success: true,

      data: settlement

    });

  };

  completeSettlement = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const { id } =
      request.params as any;

    const settlement =
      await this.settlementService.completeSettlement(
        id
      );

    return reply.send({

      success: true,

      data: settlement

    });

  };

  merchantSettlements = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const { merchantId } =
      request.params as any;

    const settlements =
      await this.settlementService.merchantSettlements(
        merchantId
      );

    return reply.send({

      success: true,

      data: settlements

    });

  };

}
