import type { Card } from "@/common/types";
import sprite from "@/assets/sprite.svg";

export const mockCards: Card[] = [
  {
    id: "1",
    brand: "visa",
    last4: "4234",
    isDefault: true,
    expirationDate: "12 / 25",
    brandIcon: `${sprite}#icon-visa`,
  },
  {
    id: "2",
    brand: "mastercard",
    last4: "5678",
    isDefault: false,
    expirationDate: "11 / 27",
    brandIcon: `${sprite}#icon-mastercard`,
  },
  {
    id: "3",
    brand: "amex",
    last4: "9017",
    isDefault: false,
    expirationDate: "01 / 26",
    brandIcon: `${sprite}#icon-amex`,
  },
  {
    id: "4",
    brand: "mastercard",
    last4: "5670",
    isDefault: false,
    expirationDate: "05 / 29",
    brandIcon: `${sprite}#icon-mastercard`,
  },
  {
    id: "5",
    brand: "amex",
    last4: "9002",
    isDefault: false,
    expirationDate: "06 / 27",
    brandIcon: `${sprite}#icon-amex`,
  },
  {
    id: "6",
    brand: "visa",
    last4: "4867",
    isDefault: false,
    expirationDate: "12 / 28",
    brandIcon: `${sprite}#icon-visa`,
  },
  {
    id: "7",
    brand: "mastercard",
    last4: "5010",
    isDefault: false,
    expirationDate: "10 / 29",
    brandIcon: `${sprite}#icon-mastercard`,
  },
];
