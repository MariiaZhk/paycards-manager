import type { CardBrand } from "./types";

export function getCardBrand(number: string): CardBrand {
  if (number.startsWith("4")) return "visa";
  if (number.startsWith("5") || number.startsWith("2")) return "mastercard";
  return "amex";
}

export function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "");
  const chunks = digits.match(/.{1,4}/g);
  return chunks ? chunks.join(" ") : "";
}

export function getMonths(): string[] {
  return Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
}

export function getYears(count = 11): string[] {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) =>
    (currentYear + i).toString().slice(-2)
  );
}

export function isExpirationDateValid(month: number, year: number): boolean {
  const now = new Date();
  const expDate = new Date(year, month - 1, 1);
  const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  return expDate >= currentMonthStart;
}
