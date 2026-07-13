export interface PaginationOptions {

  page?: number;

  limit?: number;

}

export function paginate({

  page = 1,

  limit = 20

}: PaginationOptions) {

  const safePage =

    Math.max(page, 1);

  const safeLimit =

    Math.max(

      1,

      Math.min(limit, 100)

    );

  const skip =

    (safePage - 1) * safeLimit;

  return {

    page: safePage,

    limit: safeLimit,

    skip,

    take: safeLimit

  };

}

export function paginationMeta(

  total: number,

  page: number,

  limit: number

) {

  const pages =

    Math.ceil(

      total / limit

    );

  return {

    total,

    page,

    limit,

    pages,

    hasNext:

      page < pages,

    hasPrevious:

      page > 1

  };

}
