export interface ListParams {
    itemsPerPage?: number,
    sortBy?: string[],
    sortDesc?: boolean[],
    search?: string,
    page?: number,
    period?: {
      start: string,
      end: string,
      field: string,
    }
  }
  