export interface IInvoiceFilters {
  limit?: number | null;
  status?: string | null;
  sort?: string | null;
  startAfter?: Date | null;
}