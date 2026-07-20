import api from "@/lib/axios";

import { PaymentIntentResponse } from "@/types/payment";

export async function getPaymentIntents() {

  const { data } =
    await api.get<PaymentIntentResponse>(
      "/payment-intents"
    );

  return data;

}