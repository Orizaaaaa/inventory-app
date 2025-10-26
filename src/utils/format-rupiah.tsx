export function formatRupiahNoSymbol(n: number) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: 0,
  }).format(n ?? 0);
}