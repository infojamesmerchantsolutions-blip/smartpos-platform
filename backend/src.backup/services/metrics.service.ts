export default class MetricsService {

  private counters =

    new Map<

      string,

      number

    >();

  increment(

    metric: string,

    value = 1

  ) {

    const current =

      this.counters.get(

        metric

      ) ?? 0;

    this.counters.set(

      metric,

      current + value

    );

  }

  get(

    metric: string

  ) {

    return this.counters.get(

      metric

    ) ?? 0;

  }

  all() {

    return Object.fromEntries(

      this.counters

    );

  }

  reset() {

    this.counters.clear();

  }

}
