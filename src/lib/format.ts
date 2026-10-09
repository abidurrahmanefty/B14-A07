const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: number | string): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

export function formatTaka(amount: number): string {
  const grouped = amount.toLocaleString("en-US");
  return `${toBnDigits(grouped)} টাকা`;
}

export function unitLabel(unit: string): string {
  switch (unit) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
      return "প্রতি পিস";
    default:
      return `প্রতি ${unit}`;
  }
}

export function unitShort(unit: string): string {
  switch (unit) {
    case "kg":
      return "কেজি";
    case "litre":
      return "লিটার";
    case "dozen":
      return "ডজন";
    case "piece":
      return "পিস";
    default:
      return unit;
  }
}

export function formatChange(dir: "up" | "down" | "flat", pct: number): string {
  const abs = Math.abs(pct).toFixed(1);
  const bn = toBnDigits(abs);
  if (dir === "up") return `▲ ${bn}%`;
  if (dir === "down") return `▼ ${bn}%`;
  return `—০.০%`;
}

export function banglaDate(date = new Date()): string {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function countBn(n: number): string {
  return toBnDigits(n);
}
