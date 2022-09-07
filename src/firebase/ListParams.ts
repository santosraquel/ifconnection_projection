import { QueryConstraint } from 'firebase/firestore'

export interface ListParams {
  itemsPerPage?: number,
  sortBy?: string[],
  sortDesc?: boolean[],
  search?: string,
  page?: number,
  query?: QueryConstraint[],
  period?: {
    start: string,
    end: string,
    field: string,
  }
}
