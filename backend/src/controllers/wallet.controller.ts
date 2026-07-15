import { Prisma } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import WalletService from "../services/wallet.service.js";

export default class WalletController {
  constructor(
    private readonly walletService: WalletService
  ) {}

  create = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const wallet =
      await this.walletService.createWallet(request.body);

    return reply.send({
      success: true,
      data: wallet
    });
  };

  credit = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    
    const { id } =
        request.params as any;

    const { amount } =
        request.body as any;
    
    const wallet =
        await this.walletService.creditWallet(
            id,
            new Prisma.Decimal(amount)
        );

        return reply.send({
            success: true,
            data: wallet
        });
  };

  debit = async (
    request: FastifyRequest,
    reply: FastifyReply,
  ) => {
    const { id } =
        request.params as any;
    
    const { amount } =
        request.body as any;
    
    const wallet =
        await this.walletService.debitWallet(
            id,
            new Prisma.Decimal(amount)
        );

        return reply.send({
            success: true,
            data: wallet
        });
  };

  get = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { id } = request.params as any;

    const wallet =
      await this.walletService.getWallet(id);

    return reply.send({
      success: true,
      data: wallet
    });
  };

  merchantWallets = async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const { merchantId } =
      request.params as any;

    const wallets =
      await this.walletService.merchantWallets(
        merchantId
      );

    return reply.send({
      success: true,
      data: wallets
    });
  };
}