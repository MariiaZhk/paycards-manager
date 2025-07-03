export type CardBrand = "visa" | "mastercard" | "amex";

export interface Card {
  id: string;
  brand: CardBrand;
  brandIcon?: string;
  last4: string;
  isDefault: boolean;
  expirationDate: string;
}
