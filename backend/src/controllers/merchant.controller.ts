import { FastifyReply, FastifyRequest } from "fastify";
import MerchantService from "../services/merchant.service.js";

export default class MerchantController {
  constructor(
    private readonly merchantService: MerchantService
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const merchant =
      await this.merchantService.create(
        request.body as any
      );

    return reply.code(201).send({
      success: true,
      data: merchant
    });
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { id } =
      request.params as any;

    const merchant =
      await this.merchantService.findById(id);

    return reply.send({
      success: true,
      data: merchant
    });
  };

  update = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { id } =
      request.params as any;

    const merchant =
      await this.merchantService.update(
        id,
        request.body as any
      );

    return reply.send({
      success: true,
      data: merchant
    });
  };

  delete = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { id } =
      request.params as any;

    await this.merchantService.delete(id);

    return reply.send({
      success: true
    });
  };

  list = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const {
    page = "1",
    limit = "10",
  } = request.query as {
    page?: string;
    limit?: string;
  };

  const data =
    await this.merchantService.list(
      Number(page),
      Number(limit)
    );

  return reply.send({
    success: true,
    data,
  });

};

  dashboard = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { merchantId } =
      request.params as any;

    const data =
      await this.merchantService.dashboard(
        merchantId
      );

    return reply.send({
      success: true,
      data
    });
  };
}