import axios, { AxiosInstance } from "axios";
import BaseProvider, {
  CreatePaymentInput,
  RefundPaymentInput,
  VerifyPaymentInput,
  ProviderResponse
} from "./base.provider.js";
export default class PaystackProvider extends BaseProvider {
  readonly name = "paystack";
  private readonly client: AxiosInstance;
  constructor(
    private readonly secretKey: string
  ) {
    super();
    this.client = axios.create({
      baseURL:
        "https://api.paystack.co",
      headers: {
        Authorization:
          `Bearer ${secretKey}`,
        "Content-Type":
          "application/json"
      }
    });
  }
  async createPayment(
    input: CreatePaymentInput
  ): Promise<ProviderResponse> {
    const response =
      await this.client.post(
        "/transaction/initialize",
        {
          amount:
            Math.round(
              input.amount * 100
            ),
          currency:
            input.currency,
          email:
            input.customer?.email,
          reference:
            input.reference,
          metadata:
            input.metadata
        }
      );
    return {
      success:
        response.data.status,
      message:
        response.data.message,
      reference:
        response.data.data.reference,
      transactionId:
        response.data.data.reference,
      raw:
        response.data
    };
  }
  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<ProviderResponse> {
    const response =
      await this.client.get(
        `/transaction/verify/${input.transactionId}`
      );
    return {
      success:
        response.data.status,
      message:
        response.data.data.status,
      transactionId:
        input.transactionId,
      raw:
        response.data
    };
  }
  async refundPayment(
    input: RefundPaymentInput
  ): Promise<ProviderResponse> {
    const response =
      await this.client.post(
        "/refund",
        {
          transaction:
            input.transactionId,
          amount:
            input.amount
              ? Math.round(
                  input.amount * 100
                )
              : undefined
        }
      );
    return {
      success:
        response.data.status,
      message:
        response.data.message,
      transactionId:
        response.data.data.id?.toString(),
      raw:
        response.data
    };
  }
  async validateWebhook(
    payload: any,
    signature: string
  ): Promise<boolean> {
    const crypto =
      await import("crypto");
    const hash =
      crypto
        .createHmac(
          "sha512",
          this.secretKey
        )
        .update(
          JSON.stringify(payload)
        )
        .digest("hex");
    return hash === signature;
  }
}