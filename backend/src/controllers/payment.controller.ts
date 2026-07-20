import { FastifyReply, FastifyRequest } from "fastify";
import PaymentService from "../services/payment.service.js";

export default class PaymentController {

  constructor(
    private readonly paymentService: PaymentService
  ) {}

  listPaymentIntents = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const {
    page = "1",
    limit = "10",
  } = request.query as any;

  const result =
    await this.paymentService.listPaymentIntents(
      Number(page),
      Number(limit)
    );

  return reply.send({
    success: true,
    data: result,
  });

};

expirePaymentIntent = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const { id } =
    request.params as any;

  const payment =
    await this.paymentService.expirePaymentIntent(
      id
    );

  return reply.send({
    success: true,
    data: payment,
  });

};

listTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const {
    page = "1",
    limit = "10",
  } = request.query as any;

  const data =
    await this.paymentService.listTransactions(
      Number(page),
      Number(limit)
    );

  return reply.send({

    success: true,

    data,

  });

};

getTransaction = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {

  const { id } =
    request.params as any;

  const transaction =
    await this.paymentService.findTransactionById(id);

  return reply.send({

    success: true,

    data: transaction,

  });

};

  createPaymentIntent = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const payment =
      await this.paymentService.createPaymentIntent(
        request.body as any
      );

    return reply.code(201).send({

      success: true,

      message: "Payment Intent Created",

      data: payment

    });

  };

  getPaymentIntent = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {

    const { id } =
      request.params as any;

    const payment =
      await this.paymentService.getPaymentIntent(id);

    return reply.send({

      success: true,

      data: payment

    });

  };

}
