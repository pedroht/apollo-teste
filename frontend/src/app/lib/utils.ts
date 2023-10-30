import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export function currencyStringToNumber(value: string) {
  const sanitizedString = value.replace(/\./g, "").replace(",", ".");

  return Number(sanitizedString);
}

export function transformPriceFloatToString(value: number) {
  return value.toString().replace(".", ",")
}

export function transformDecimalDiscountToPercent(discount: number) {
  return `${(discount * 100).toFixed(2)}%`
}
