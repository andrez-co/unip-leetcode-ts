const romanValues = new Map<string, number>([
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
]);

export function romanToInt(s: string): number {
  let total = 0;

  for (let index = 0; index < s.length; index += 1) {
    const current = romanValues.get(s[index]) ?? 0;
    const next = romanValues.get(s[index + 1]) ?? 0;

    if (current < next) {
      total -= current;
    } else {
      total += current;
    }
  }

  return total;
}

console.log(romanToInt('III'));
console.log(romanToInt('LVIII'));
console.log(romanToInt('MCMXCIV'));
