import type { Card } from "@/common/types";

export const mockCards: Card[] = [
  {
    id: "1",
    brand: "visa",
    last4: "1234",
    isDefault: true,
  },
  {
    id: "2",
    brand: "mastercard",
    last4: "5678",
    isDefault: false,
  },
  {
    id: "3",
    brand: "amex",
    last4: "9012",
    isDefault: false,
  },
];
