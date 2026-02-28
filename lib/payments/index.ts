export * from "./types";
export * from "./mensualites";
export * from "./inscription";
export * from "./cantine";
export * from "./tenues";
export * from "./etude-dirigee";
export * from "./cours-vacances";

/** Formate un montant en XOF */
export function formatXOF(montant: number): string {
  return new Intl.NumberFormat("fr-SN", {
    style: "currency",
    currency: "XOF",
    maximumFractionDigits: 0,
  }).format(montant);
}
