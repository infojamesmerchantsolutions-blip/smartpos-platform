import crypto from "crypto";

export interface ReferenceOptions {

  prefix: string;

  length?: number;

}

export function generateReference({

  prefix,

  length = 12

}: ReferenceOptions): string {

  const random = crypto

    .randomBytes(length)

    .toString("hex")

    .toUpperCase()

    .substring(0, length);

  const timestamp =

    Date.now()
      .toString()
      .slice(-6);

  return `${prefix}-${timestamp}-${random}`;

}

export function generateTransactionReference() {

  return generateReference({

    prefix: "TXN"

  });

}

export function generatePaymentReference() {

  return generateReference({

    prefix: "PAY"

  });

}

export function generateSettlementReference() {

  return generateReference({

    prefix: "SET"

  });

}

export function generateWalletTransferReference() {

  return generateReference({

    prefix: "WT"

  });

}

export function generateBlockchainReference() {

  return generateReference({

    prefix: "BC"

  });

}
