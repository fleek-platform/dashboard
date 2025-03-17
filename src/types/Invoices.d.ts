export type Invoice = {
  id: string;
  amountDue: number;
  amountPaid: number;
  amountRemaining: number;
  created_at: string;
  due_date?: string;
  hosted_invoice_url: string;
  invoice_pdf: string;
  number: string;
  period_end_date: string;
  period_start_date: string;
  status: string;
};
