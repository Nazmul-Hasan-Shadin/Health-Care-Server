type IOptionsResult={
    page:number,
    limit:number,
    skip:number,
    sortBy:string,
    sortOrder:string
}
const calculatePagination = (options: {
    page?: number;
    limit?: number;
    sortOrder?: string;
    sortBy?: string;
  }):IOptionsResult => {
    const page: number = Number(options.page || 1);
    const limit: number = Number(options.limit) || 10;
    const skip: number = (Number(page) - 1) * Number(limit);
    const sortBy: string = options.sortBy || "createdAt";
    const sortOrder: string = options.sortOrder || "desc";
    return {
      page,
      limit,
      sortBy,
      skip,
      sortOrder,
    };
  };
  export const paginationHelper={
    calculatePagination
  }