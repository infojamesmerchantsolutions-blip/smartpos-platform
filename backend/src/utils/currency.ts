import { Prisma } from "@prisma/client";

export function decimal(

  value:

    string |

    number |

    Prisma.Decimal

) {

  return new Prisma.Decimal(

    value

  );

}

export function add(

  a: Prisma.Decimal,

  b: Prisma.Decimal

) {

  return a.plus(b);

}

export function subtract(

  a: Prisma.Decimal,

  b: Prisma.Decimal

) {

  return a.minus(b);

}

export function multiply(

  a: Prisma.Decimal,

  b: Prisma.Decimal

) {

  return a.mul(b);

}

export function divide(

  a: Prisma.Decimal,

  b: Prisma.Decimal

) {

  return a.div(b);

}

export function percentage(

  amount: Prisma.Decimal,

  percent: number

) {

  return amount.mul(

    percent

  ).div(100);

}

export function round(

  amount: Prisma.Decimal,

  decimals = 2

) {

  return new Prisma.Decimal(

    amount.toFixed(

      decimals

    )

  );

}

export function formatCurrency(

  amount:

    Prisma.Decimal |

    number,

  currency = "USD"

) {

  return new Intl.NumberFormat(

    "en-US",

    {

      style: "currency",

      currency

    }

  ).format(

    Number(amount)

  );

}
