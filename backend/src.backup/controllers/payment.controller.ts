import { FastifyReply, FastifyRequest } from "fastify";
import PaymentService from "../services/payment.service";

export default class PaymentController {

  constructor(
    private readonly paymentService: PaymentService
  ) {}

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
