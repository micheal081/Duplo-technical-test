interface Name {
  firstName: string;
  lastName: string;
}

export interface TaxData {
  id: number;
  fullName: Name;
  address: string;
  amount: number;
  vat?: string;
  approved: boolean;
}
