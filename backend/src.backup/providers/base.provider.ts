export interface CreatePaymentInput {

  amount: number;

  currency: string;

  reference: string;

  description?: string;

  customer?: any;

  metadata?: Record<string, any>;

}

export interface RefundPaymentInput {

  transactionId: string;

  amount?: number;

  reason?: string;

}

export interface VerifyPaymentInput {

  transactionId: string;

}

export interface ProviderResponse {

  success: boolean;

  message: string;

  reference?: string;

  transactionId?: string;

  authorizationCode?: string;

  raw?: any;

}

export default abstract class BaseProvider {

  abstract readonly name: string;

  abstract createPayment(
    input: CreatePaymentInput
  ): Promise<ProviderResponse>;

  abstract verifyPayment(
    input: VerifyPaymentInput
  ): Promise<ProviderResponse>;

  abstract refundPayment(
    input: RefundPaymentInput
  ): Promise<ProviderResponse>;

  abstract validateWebhook(
    payload: any,
    signature: string
  ): Promise<boolean>;

}
