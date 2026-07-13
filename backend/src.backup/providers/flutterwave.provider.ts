import axios, { AxiosInstance } from "axios";
import BaseProvider, {
  CreatePaymentInput,
  RefundPaymentInput,
  VerifyPaymentInput,
  ProviderResponse
} from "./base.provider";
export default class FlutterwaveProvider extends BaseProvider {
  readonly name = "flutterwave";
  private readonly client: AxiosInstance;
  constructor(
    private readonly secretKey: string
  ) {
    super();
    this.client = axios.create({
      baseURL:
        "https://api.flutterwave.com/v3",
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
        "/payments",
        {
          tx_ref:
            input.reference,
          amount:
            input.amount,
          currency:
            input.currency,
          redirect_url:
            input.metadata?.redirectUrl,
          customer: {
            email:
              input.customer?.email,
            name:
              input.customer?.name,
            phone_number:
              input.customer?.phone
          },
          customizations: {
            title:
              input.description ||
              "Payment"
          },
          meta:
            input.metadata
        }
      );
    return {
      success:
        response.data.status ===
        "success",
      message:
        response.data.message,
      reference:
        input.reference,
      transactionId:
        response.data.data?.id?.toString(),
      raw:
        response.data
    };
  }
  async verifyPayment(
    input: VerifyPaymentInput
  ): Promise<ProviderResponse> {
    const response =
      await this.client.get(
        `/transactions/${input.transactionId}/verify`
      );
    return {
      success:
        response.data.status ===
        "success",
      message:
        response.data.message,
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
        "/transactions/refund",
        {
          id:
            input.transactionId,
          amount:
            input.amount
        }
      );
    return {
      success:
        response.data.status ===
        "success",
      message:
        response.data.message,
      transactionId:
        response.data.data?.id?.toString(),
      raw:
        response.data
    };
  }
  async validateWebhook(
    payload: any,
    signature: string
  ): Promise<boolean> {
    const webhookSecret =
      process.env
        .FLUTTERWAVE_WEBHOOK_SECRET;
    if (
      !webhookSecret
    ) {
      return false;
    }
    return (
      signature ===
      webhookSecret
    );
  }
}