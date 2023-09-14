const formatter = new Intl.NumberFormat("en-US", {
  compactDisplay: "short",
  notation: "compact",
});

export function formatNumber(number: number) {
    return formatter.format(number)
}
