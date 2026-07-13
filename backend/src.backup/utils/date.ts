export function now(): Date {

  return new Date();

}

export function addMinutes(

  minutes: number

): Date {

  const date = new Date();

  date.setMinutes(

    date.getMinutes() +

    minutes

  );

  return date;

}

export function addHours(

  hours: number

): Date {

  const date = new Date();

  date.setHours(

    date.getHours() +

    hours

  );

  return date;

}

export function addDays(

  days: number

): Date {

  const date = new Date();

  date.setDate(

    date.getDate() +

    days

  );

  return date;

}

export function isExpired(

  expiresAt?: Date | null

): boolean {

  if (!expiresAt) {

    return false;

  }

  return expiresAt.getTime()

    <

    Date.now();

}

export function unixTimestamp(): number {

  return Math.floor(

    Date.now() / 1000

  );

}

export function isoNow(): string {

  return new Date()

    .toISOString();

}
