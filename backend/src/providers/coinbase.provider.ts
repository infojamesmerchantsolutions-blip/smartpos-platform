import axios, { AxiosInstance } from "axios";
import BaseProvider, {
  CreatePaymentInput,
  RefundPaymentInput,
  VerifyPaymentInput,
  ProviderResponse
} from "./base.provider.js";
export default class CoinbaseProvider extends BaseProvider {
  readonly name = "coinbase";
  private readonly client: AxiosInstance;
  constructor(
    private readonly apiKey: string
  ) {
    super();
    this.client = axios.create({
      baseURL:
        "https://api.commerce.coinbase.com",
      headers: {
        "X-CC-Api-Key":
          apiKey,
        "X-CC-Version":
          "2018-03-22",
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
        "/charges",
        {
          name:
            input.description ||
            "Payment",
          description:
            input.description,
          pricing_type:
            "fixed_price",
          local_price: {
            amount:
              input.amount,
            currency:
              input.currency
          },
          metadata: {
            reference:
              input.reference,
            ...(input.metadata ?? {})
          }
        }
      );
    return {
      success: true,
      message:
        "Charge created.",
      reference:
        input.reference,
      transactionId:
        response.data.data.id,
      raw:
        response.data
    };
  }
  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<ProviderResponse> {
    const response =
      await this.client.get(
        `/charges/${input.transactionId}`
      );
    return {
      success:
        response.data.data.timeline.some(
          (item: any) =>
            item.status ===
            "COMPLETED"
        ),
      message:
        "Charge retrieved.",
      transactionId:
        response.data.data.id,
      raw:
        response.data
    };
  }
  async refundPayment(
    input: RefundPaymentInput
  ): Promise<ProviderResponse> {
    return {
      success: false,
      message:
        "Coinbase Commerce does not support direct API refunds.",
      transactionId:
        input.transactionId
    };
  }
  async validateWebhook(
    payload: any,
    signature: string
  ): Promise<boolean> {
    const crypto =
      await import("crypto");
    const secret =
      process.env
        .COINBASE_WEBHOOK_SECRET;
    if (
      !secret
    ) {
      return false;
    }
    const digest =
      crypto
        .createHmac(
          "sha256",
          secret
        )
        .update(
          JSON.stringify(payload)
        )
        .digest("hex");
    return digest === signature;
  }
}