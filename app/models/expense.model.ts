export interface ExpenseItem {
  id: string;
  purchasedOn: Date;
  nature: string;
  originalAmount: Amount;
  convertedAmount: Amount;
  comment: string;
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface Amount {
  amount: number;
  currency: string;
}
